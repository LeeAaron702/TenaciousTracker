from fastapi import APIRouter, Depends, Request
from queries.vehicle import VehicleIn, VehicleOut, VehicleQueries
from authenticator import authenticator
from typing import List, Optional


router = APIRouter()
vehicle_queries = VehicleQueries()


@router.get("/api/vehicles", response_model=List[VehicleOut])
async def get_vehicles(
    account_data=Depends(authenticator.get_current_account_data),
) -> List[VehicleOut]:
    return vehicle_queries.get_all()


@router.post("/api/vehicle", response_model=VehicleOut)
async def create_vehicle(
    vehicle: VehicleIn,
    account_data=Depends(authenticator.get_current_account_data),
) -> VehicleOut:
    return vehicle_queries.create(vehicle)


@router.get("/api/vehicle/{vehicle_id}", response_model=VehicleOut)
async def get_vehicle(
    vehicle_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> VehicleOut:
    return vehicle_queries.get_one(vehicle_id)


@router.put("/api/vehicle/{vehicle_id}", response_model=VehicleOut)
async def update_vehicle(
    vehicle_id: int,
    vehicle: VehicleIn,
    account_data=Depends(authenticator.get_current_account_data),
) -> VehicleOut:
    return vehicle_queries.update(vehicle_id, vehicle)


@router.delete("/api/vehicle/{vehicle_id}", response_model=bool)
async def delete_vehicle(
    vehicle_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    return vehicle_queries.delete(vehicle_id)
