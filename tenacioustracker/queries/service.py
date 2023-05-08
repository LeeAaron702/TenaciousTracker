from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class ServiceIn(BaseModel):
    vehicle_id: int
    service_date: str
    service_type: str
    service_description: Optional[str] = None
    service_cost: float
    service_shop_name: str
    service_shop_location: Optional[str] = None
    service_mileage: Optional[float] = None
    parts_used: Optional[str] = None
    warranty: Optional[bool] = False
    notes: Optional[str] = None


class ServiceOut(BaseModel):
    service_id: int
    vehicle_id: int
    service_date: str
    service_type: str
    service_description: Optional[str] = None
    service_cost: float
    service_shop_name: str
    service_shop_location: Optional[str] = None
    service_mileage: Optional[float] = None
    parts_used: Optional[str] = None
    warranty: Optional[bool] = False
    notes: Optional[str] = None


class ServiceQueries:
    def get_all(self) -> List[ServiceOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT service_id, vehicle_id, service_date, service_type, service_description, service_cost, service_shop_name, service_shop_location, service_mileage, parts_used, warranty, notes
                    FROM services
                    """
                )
                result = []
                for record in db:
                    service = ServiceOut(
                        service_id=record[0],
                        vehicle_id=record[1],
                        service_date=str(record[2]),
                        service_type=record[3],
                        service_description=record[4],
                        service_cost=float(record[5]),
                        service_shop_name=record[6],
                        service_shop_location=record[7],
                        service_mileage=float(record[8])
                        if record[8] is not None
                        else None,
                        parts_used=record[9],
                        warranty=bool(record[10]),
                        notes=record[11],
                    )
                    result.append(service)
                return result

    def create(self, service: ServiceIn) -> ServiceOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO services (vehicle_id, service_date, service_type, service_description, service_cost, service_shop_name, service_shop_location, service_mileage, parts_used, warranty, notes)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING service_id
                    """,
                    [
                        service.vehicle_id,
                        service.service_date,
                        service.service_type,
                        service.service_description,
                        service.service_cost,
                        service.service_shop_name,
                        service.service_shop_location,
                        service.service_mileage,
                        service.parts_used,
                        service.warranty,
                        service.notes,
                    ],
                )
                result = db.fetchone()
                service_id = result[0]
                old_data = service.dict()
                return ServiceOut(service_id=service_id, **old_data)

    def update(self, service_id: int, service: ServiceIn) -> ServiceOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE services
                    SET vehicle_id = %s, service_date = %s, service_type = %s, service_description = %s, service_cost = %s, service_shop_name = %s, service_shop_location = %s, service_mileage = %s, parts_used = %s, warranty = %s, notes = %s
                    WHERE service_id = %s
                    """,
                    [
                        service.vehicle_id,
                        service.service_date,
                        service.service_type,
                        service.service_description,
                        service.service_cost,
                        service.service_shop_name,
                        service.service_shop_location,
                        service.service_mileage,
                        service.parts_used,
                        service.warranty,
                        service.notes,
                        service_id,
                    ],
                )
                old_data = service.dict()
                return ServiceOut(service_id=service_id, **old_data)

    def delete(self, service_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM services
                    WHERE service_id = %s
                    """,
                    [service_id],
                )
                return True

    def get_one(self, service_id: int) -> Optional[ServiceOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT service_id, vehicle_id, service_date, service_type, service_description, service_cost, service_shop_name, service_shop_location, service_mileage, parts_used, warranty, notes
                    FROM services
                    WHERE service_id = %s
                    """,
                    [service_id],
                )
                record = db.fetchone()
                if record is None:
                    return None
                return ServiceOut(
                    service_id=record[0],
                    vehicle_id=record[1],
                    service_date=str(record[2]),
                    service_type=record[3],
                    service_description=record[4],
                    service_cost=float(record[5]),
                    service_shop_name=record[6],
                    service_shop_location=record[7],
                    service_mileage=float(record[8])
                    if record[8] is not None
                    else None,
                    parts_used=record[9],
                    warranty=bool(record[10]),
                    notes=record[11],
                )

    def get_by_vehicle_id(self, vehicle_id: int) -> List[ServiceOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT service_id, vehicle_id, service_date, service_type, service_description, service_cost, service_shop_name, service_shop_location, service_mileage, parts_used, warranty, notes
                    FROM services
                    WHERE vehicle_id = %s
                    """,
                    [vehicle_id],
                )
                result = []
                for record in db:
                    service = ServiceOut(
                        service_id=record[0],
                        vehicle_id=record[1],
                        service_date=str(record[2]),
                        service_type=record[3],
                        service_description=record[4],
                        service_cost=float(record[5]),
                        service_shop_name=record[6],
                        service_shop_location=record[7],
                        service_mileage=float(record[8])
                        if record[8] is not None
                        else None,
                        parts_used=record[9],
                        warranty=bool(record[10]),
                        notes=record[11],
                    )
                    result.append(service)
                return result
