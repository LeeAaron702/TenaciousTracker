from fastapi import APIRouter, Depends
from typing import List, Optional
from queries.service import ServiceIn, ServiceOut, ServiceQueries
from authenticator import authenticator

router = APIRouter()
service_queries = ServiceQueries()


@router.get("/api/services", response_model=List[ServiceOut])
async def get_services(
    account_data=Depends(authenticator.get_current_account_data),
) -> List[ServiceOut]:
    return service_queries.get_all()


@router.post("/api/service", response_model=ServiceOut)
async def create_service(
    service: ServiceIn,
    account_data=Depends(authenticator.get_current_account_data),
) -> ServiceOut:
    return service_queries.create(service)


@router.get("/api/service/{service_id}", response_model=ServiceOut)
async def get_service(
    service_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> ServiceOut:
    return service_queries.get_one(service_id)


@router.put("/api/service/{service_id}", response_model=ServiceOut)
async def update_service(
    service_id: int,
    service: ServiceIn,
    account_data=Depends(authenticator.get_current_account_data),
) -> ServiceOut:
    return service_queries.update(service_id, service)


@router.delete("/api/service/{service_id}", response_model=bool)
async def delete_service(
    service_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    return service_queries.delete(service_id)


@router.get(
    "/api/vehicle/{vehicle_id}/services", response_model=List[ServiceOut]
)
async def get_services_by_vehicle_id(
    vehicle_id: int,
    account_data=Depends(authenticator.get_current_account_data),
) -> List[ServiceOut]:
    return service_queries.get_by_vehicle_id(vehicle_id)
