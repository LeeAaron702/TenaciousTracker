from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class VehicleIn(BaseModel):
    user_id: int
    make: str
    model: str
    year: int
    vin: str
    fuel_type: Optional[str] = None
    color: Optional[str] = None
    modifications: Optional[str] = None


class VehicleOut(BaseModel):
    id: int
    user_id: int
    make: str
    model: str
    year: int
    vin: str
    fuel_type: Optional[str] = None
    color: Optional[str] = None
    modifications: Optional[str] = None


class VehicleQueries:
    def get_all(self) -> List[VehicleOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, user_id, make, model, year, vin, fuel_type, color, modifications
                    FROM vehicles
                    """
                )
                result = []
                for record in db:
                    vehicle = VehicleOut(
                        id=record[0],
                        user_id=record[1],
                        make=record[2],
                        model=record[3],
                        year=record[4],
                        vin=record[5],
                        fuel_type=record[6],
                        color=record[7],
                        modifications=record[8],
                    )
                    result.append(vehicle)
                return result

    def create(self, vehicle: VehicleIn) -> VehicleOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO vehicles (user_id, make, model, year, vin, fuel_type, color, modifications)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        vehicle.user_id,
                        vehicle.make,
                        vehicle.model,
                        vehicle.year,
                        vehicle.vin,
                        vehicle.fuel_type,
                        vehicle.color,
                        vehicle.modifications,
                    ],
                )
                result = db.fetchone()
                id = result[0]
                old_data = vehicle.dict()
                return VehicleOut(id=id, **old_data)

    def update(self, vehicle_id: int, vehicle: VehicleIn) -> VehicleOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE vehicles
                    SET user_id = %s, make = %s, model = %s, year = %s, vin = %s, fuel_type = %s, color = %s, modifications = %s
                    WHERE id = %s
                    """,
                    [
                        vehicle.user_id,
                        vehicle.make,
                        vehicle.model,
                        vehicle.year,
                        vehicle.vin,
                        vehicle.fuel_type,
                        vehicle.color,
                        vehicle.modifications,
                        vehicle_id,
                    ],
                )
                old_data = vehicle.dict()
                return VehicleOut(id=vehicle_id, **old_data)

    def delete(self, vehicle_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM vehicles
                    WHERE id = %s
                    """,
                    [vehicle_id],
                )
                return True

    def get_one(self, vehicle_id: int) -> Optional[VehicleOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, user_id, make, model, year, vin, fuel_type, color, modifications
                    FROM vehicles
                    WHERE id = %s
                    """,
                    [vehicle_id],
                )
                record = db.fetchone()
                if record is None:
                    return None
                return VehicleOut(
                    id=record[0],
                    user_id=record[1],
                    make=record[2],
                    model=record[3],
                    year=record[4],
                    vin=record[5],
                    fuel_type=record[6],
                    color=record[7],
                    modifications=record[8],
                )
