import workersService from "@/logic/services/worker.service";

export async function getWorkers() {
  try {
    const response = await workersService.listWorkers();
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error.: ', error);
  }
}