-- 이벤트 스케줄러 설정 켜기
-- SHOW VARIABLES LIKE 'event%';
-- SET GLOBAL event_scheduler=on;

DELIMITER //
-- 미션 종료 이벤트 스케줄러
CREATE EVENT MissionCompletion
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')
DO
BEGIN
  -- 종료된 미션의  mission_status를 2로 업데이트
  UPDATE mission
  SET mission_status = 2
  WHERE mission_status = 1
  AND mission_current_cycle = mission_total_cycle
  AND DATE_ADD(mission_start_date, INTERVAL mission_total_cycle * mission_period DAY) = CURRENT_DATE;
  

  -- member_mission 테이블의 member_mission_status 업데이트
  UPDATE member_mission AS mm
  JOIN mission AS m ON mm.mission_id = m.mission_id
  SET mm.member_mission_status = CASE
    WHEN (
      SELECT COUNT(*)
      FROM record AS r
      WHERE r.member_email = mm.member_email
      AND r.mission_id = mm.mission_id
      AND r.record_status = 2
    ) >= (
      SELECT mission_failure_count
      FROM mission AS m2
      WHERE m2.mission_id = mm.mission_id
    ) THEN 3
    ELSE 2
  END
  WHERE m.mission_status = 2
  AND DATE_ADD(mission_start_date, INTERVAL mission_total_cycle * mission_period DAY) = CURRENT_DATE
  AND m.mission_id = mm.mission_id;
END;
//
DELIMITER ;

DELIMITER //
-- 미션 시작 이벤트 스케줄러
CREATE EVENT MissionStart
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:01')
DO
BEGIN
  -- 오늘이 시작일인 미션의 mission_status를 1로 변경
  UPDATE mission AS m
  SET m.mission_status = 1
  WHERE DATE(m.mission_start_date) = CURRENT_DATE;

  -- member_mission 테이블 업데이트
  UPDATE member_mission AS mm
  JOIN mission AS m ON mm.mission_id = m.mission_id
  SET mm.member_mission_status = 1
  WHERE DATE(m.mission_start_date) = CURRENT_DATE;
END;
//

DELIMITER ;

DELIMITER //
-- 레코드 생성
CREATE EVENT RecordCreation
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:02')
DO
BEGIN
	-- 레코드 생성
  INSERT INTO record (mission_id, member_email, record_number)
  SELECT mm.mission_id, mm.member_email, m.mission_current_cycle+1
  FROM mission AS m
  JOIN member_mission AS mm ON m.mission_id = mm.mission_id
  WHERE DATE_ADD(m.mission_start_date, INTERVAL m.mission_current_cycle * m.mission_period DAY) = CURRENT_DATE;
  
  -- 오늘 새로운 사이클이 시작되는 미션 찾아서 mission_current_cycle 업데이트
  UPDATE mission AS m
  JOIN member_mission AS mm ON m.mission_id = mm.mission_id
  SET m.mission_current_cycle = m.mission_current_cycle + 1
  WHERE DATE_ADD(m.mission_start_date, INTERVAL m.mission_current_cycle * m.mission_period DAY) = CURRENT_DATE;
END;
//

DELIMITER ;

-- 이벤트 목록 보기
SHOW EVENTS;