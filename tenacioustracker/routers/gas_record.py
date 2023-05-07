from fastapi import APIRouter, Depends, Request
from queries.gas_record import GasRecord, GasRecordOut, GasRecordQueries
from authenticator import authenticator
from typing import List, Optional


router = APIRouter()
gas_record_queries = GasRecordQueries()


@router.get("/api/gas_records", response_model=List[GasRecordOut])
async def get_gas_records(
    account_data=Depends(authenticator.get_current_account_data),
) -> List[GasRecordOut]:
    return gas_record_queries.get_all()


@router.post("/api/gas_record", response_model=GasRecordOut)
async def create_gas_record(
    gas_record: GasRecord,
    account_data=Depends(authenticator.get_current_account_data),
) -> GasRecordOut:
    return gas_record_queries.create(gas_record)


@router.get("/api/gas_record/{gas_record_id}", response_model=GasRecordOut)
async def get_gas_record(
    gas_record_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> GasRecordOut:
    return gas_record_queries.get_one(gas_record_id)


@router.put("/api/gas_record/{gas_record_id}", response_model=GasRecordOut)
async def update_gas_record(
    gas_record_id: int,
    gas_record: GasRecord,
    account_data=Depends(authenticator.get_current_account_data),
) -> GasRecordOut:
    return gas_record_queries.update(gas_record_id, gas_record)


@router.delete("/api/gas_record/{gas_record_id}", response_model=bool)
async def delete_gas_record(
    gas_record_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    return gas_record_queries.delete(gas_record_id)


@router.get(
    "/api/vehicle/{vehicle_id}/gas_records", response_model=List[GasRecordOut]
)
async def get_gas_records_for_vehicle(
    vehicle_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> List[GasRecordOut]:
    return gas_record_queries.get_all_for_vehicle(vehicle_id)
