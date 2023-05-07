from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional
from datetime import date


class GasRecord(BaseModel):
    vehicle_id: int
    purchase_date: date
    gallons: float
    price: float
    location: str
    mpg_per_tank: Optional[float] = None
    odometer_reading: Optional[float] = None
    fuel_grade: Optional[str] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None
    fuel_brand: Optional[str] = None


class GasRecordOut(BaseModel):
    id: int
    vehicle_id: int
    purchase_date: date
    gallons: float
    price: float
    location: str
    mpg_per_tank: Optional[float] = None
    odometer_reading: Optional[float] = None
    fuel_grade: Optional[str] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None
    fuel_brand: Optional[str] = None


class GasRecordQueries:
    def get_all(self) -> List[GasRecordOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, vehicle_id, purchase_date, gallons, price, location, mpg_per_tank,
                    odometer_reading, fuel_grade, payment_method, notes, fuel_brand
                    FROM gas_purchases
                    """
                )
                result = []
                for record in db:
                    gas_record = GasRecord(
                        vehicle_id=record[1],
                        purchase_date=record[2],
                        gallons=record[3],
                        price=record[4],
                        location=record[5],
                        mpg_per_tank=record[6],
                        odometer_reading=record[7],
                        fuel_grade=record[8],
                        payment_method=record[9],
                        notes=record[10],
                        fuel_brand=record[11],
                    )
                    gas_record_out = GasRecordOut(
                        id=record[0], gas_record=gas_record
                    )
                    result.append(gas_record_out)
                return result

    def create(self, gas_record: GasRecord) -> GasRecordOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO gas_purchases (vehicle_id, purchase_date, gallons, price, location, 
                    mpg_per_tank, odometer_reading, fuel_grade, payment_method, notes, fuel_brand)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        gas_record.vehicle_id,
                        gas_record.purchase_date,
                        gas_record.gallons,
                        gas_record.price,
                        gas_record.location,
                        gas_record.mpg_per_tank,
                        gas_record.odometer_reading,
                        gas_record.fuel_grade,
                        gas_record.payment_method,
                        gas_record.notes,
                        gas_record.fuel_brand,
                    ],
                )
                result = db.fetchone()
                id = result[0]
                gas_record_out = GasRecordOut(
                    id=id,
                    vehicle_id=gas_record.vehicle_id,
                    purchase_date=gas_record.purchase_date,
                    gallons=gas_record.gallons,
                    price=gas_record.price,
                    location=gas_record.location,
                    mpg_per_tank=gas_record.mpg_per_tank,
                    odometer_reading=gas_record.odometer_reading,
                    fuel_grade=gas_record.fuel_grade,
                    payment_method=gas_record.payment_method,
                    notes=gas_record.notes,
                    fuel_brand=gas_record.fuel_brand,
                )
            return gas_record_out

    def update(
        self, gas_record_id: int, gas_record_in: GasRecord
    ) -> GasRecordOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE gas_purchases
                    SET vehicle_id = %s, purchase_date = %s, gallons = %s, price = %s, location = %s, mpg_per_tank = %s, odometer_reading = %s, fuel_grade = %s, payment_method = %s, 
                    notes = %s, fuel_brand = %s
                    WHERE id = %s
                    """,
                    [
                        gas_record_in.vehicle_id,
                        gas_record_in.purchase_date,
                        gas_record_in.gallons,
                        gas_record_in.price,
                        gas_record_in.location,
                        gas_record_in.mpg_per_tank,
                        gas_record_in.odometer_reading,
                        gas_record_in.fuel_grade,
                        gas_record_in.payment_method,
                        gas_record_in.notes,
                        gas_record_in.fuel_brand,
                        gas_record_id,
                    ],
                )
                return GasRecordOut(id=gas_record_id, **gas_record_in.dict())

    def delete(self, gas_record_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM gas_purchases
                    WHERE id = %s
                    """,
                    [gas_record_id],
                )
                return True

    def get_one(self, gas_record_id: int) -> Optional[GasRecordOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, vehicle_id, purchase_date, gallons, price, location, mpg_per_tank,
                    odometer_reading, fuel_grade, payment_method, notes, fuel_brand
                    FROM gas_purchases
                    WHERE id = %s
                    """,
                    [gas_record_id],
                )
                record = db.fetchone()
                if record is None:
                    return None
                gas_record = GasRecord(
                    vehicle_id=record[1],
                    purchase_date=record[2],
                    gallons=record[3],
                    price=record[4],
                    location=record[5],
                    mpg_per_tank=record[6],
                    odometer_reading=record[7],
                    fuel_grade=record[8],
                    payment_method=record[9],
                    notes=record[10],
                    fuel_brand=record[11],
                )
                return GasRecordOut(id=record[0], **gas_record.dict())

    def get_all_for_vehicle(self, vehicle_id: int) -> List[GasRecordOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, vehicle_id, purchase_date, gallons, price, location, mpg_per_tank,
                    odometer_reading, fuel_grade, payment_method, notes, fuel_brand
                    FROM gas_purchases
                    WHERE vehicle_id = %s
                    """,
                    [vehicle_id],
                )
                result = []
                for record in db:
                    gas_record_out = GasRecordOut(
                        id=record[0],
                        vehicle_id=record[1],
                        purchase_date=record[2],
                        gallons=record[3],
                        price=record[4],
                        location=record[5],
                        mpg_per_tank=record[6],
                        odometer_reading=record[7],
                        fuel_grade=record[8],
                        payment_method=record[9],
                        notes=record[10],
                        fuel_brand=record[11],
                    )
                    result.append(gas_record_out)
                return result
