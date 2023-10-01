DELIMITER //
# 미션 시작 이벤트 스케줄러
CREATE EVENT MissionStart
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')
DO
BEGIN
  # 오늘이 시작일인 미션의 mission_status를 1로 변경
UPDATE mission AS m
SET m.mission_status = 1
WHERE DATE(m.mission_start_date) = CURRENT_DATE;

# member_mission 테이블 업데이트
UPDATE member_mission AS mm
    JOIN mission AS m ON mm.mission_id = m.mission_id
    SET mm.member_mission_status = 1
WHERE DATE(m.mission_start_date) = CURRENT_DATE;
END;
//

DELIMITER ;


DELIMITER //
# 레코드 생성 이벤트 스케줄러
CREATE EVENT RecordCreation
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:01')
DO
BEGIN
	# 레코드 생성
  INSERT INTO record (mission_id, member_email, record_number, record_start_date, record_end_date)
SELECT mm.mission_id, mm.member_email, m.mission_current_cycle+1, CURRENT_DATE,
       DATE_ADD(CURRENT_DATE, INTERVAL (m.mission_period - 1) DAY)
FROM mission AS m
         JOIN member_mission AS mm ON m.mission_id = mm.mission_id
WHERE DATE_ADD(m.mission_start_date, INTERVAL m.mission_current_cycle * m.mission_period DAY) = CURRENT_DATE;

# 오늘 새로운 사이클이 시작되는 미션 찾아서 mission_current_cycle 업데이트
UPDATE mission AS m
    JOIN member_mission AS mm ON m.mission_id = mm.mission_id
    SET m.mission_current_cycle = m.mission_current_cycle + 1
WHERE DATE_ADD(m.mission_start_date, INTERVAL m.mission_current_cycle * m.mission_period DAY) = CURRENT_DATE;
END;
//

DELIMITER ;


DELIMITER //
# 레코드 종료 이벤트 스케줄러
CREATE EVENT UpdateRecordStatus
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:05:00')
DO
BEGIN
  # 어제의 날짜 계산
  DECLARE yesterday DATE;
  SET yesterday = DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY);

  # record 테이블에서 조건에 맞는 레코드 선택하여 업데이트
UPDATE record
SET record_status = 1
WHERE record_end_date = yesterday
  AND record_status = 0;

END;
//
DELIMITER ;


DELIMITER //
# 미션 종료 이벤트 스케줄러
CREATE EVENT MissionCompletion
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:05:01')
DO
BEGIN
  # 종료된 미션의  mission_status를 2로 업데이트
UPDATE mission
SET mission_status = 2
WHERE mission_status = 1
  AND mission_current_cycle = mission_total_cycle
  AND DATE_ADD(mission_start_date, INTERVAL mission_total_cycle * mission_period DAY) = CURRENT_DATE;


# member_mission 테이블의 member_mission_status 업데이트
UPDATE member_mission AS mm
    JOIN mission AS m ON mm.mission_id = m.mission_id
    SET mm.member_mission_status = CASE
        WHEN (
        SELECT COUNT(*)
        FROM record AS r
        WHERE r.member_email = mm.member_email
        AND r.mission_id = mm.mission_id
        AND r.record_status = 1
        ) >= (m.mission_total_cycle * 0.8) THEN 2
        ELSE 3
END
WHERE m.mission_status = 2
  AND DATE_ADD(m.mission_start_date, INTERVAL m.mission_total_cycle * m.mission_period DAY) = CURRENT_DATE
  AND m.mission_id = mm.mission_id;
END;
//
DELIMITER ;


DELIMITER //
# 적금 납입 체크 이벤트 스케줄러
CREATE EVENT UpdateMemberMissionIsSaving
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '02:00:00')
DO
BEGIN
  # 어제의 날짜 계산
  DECLARE yesterday DATE;
  SET yesterday = DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY);

  # record 테이블에서 어제 회차가 종료됐고 성공한 경우에 대해 memberMissionIsSaving 업데이트
UPDATE member_mission AS mm
    JOIN record AS r ON mm.member_email = r.member_email AND mm.mission_id = r.mission_id
    SET mm.member_mission_is_saving = TRUE
WHERE r.record_end_date = yesterday
  AND r.record_status = 1
  AND mm.member_mission_saving_money > 0;

END;
//

DELIMITER ;