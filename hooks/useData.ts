import { useEffect, useState } from "react";
interface Sector {
    name: string;
}

interface Employee {
    name: string | null;
}

interface Team {
    name: string;
}

const useTaskData = (companyId: string) => {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sectorsResponse, teamsResponse, employeesResponse] = await Promise.all([
                    fetch(`/api/company/sectors?companyId=${companyId}`),
                    fetch(`/api/company/teams?companyId=${companyId}`),
                    fetch(`/api/company/employees/all?companyId=${companyId}`),
                ]);

                if (!sectorsResponse.ok || !teamsResponse.ok || !employeesResponse.ok) {
                    throw new Error("Error fetching data");
                }

                const sectorsData: Sector[] = await sectorsResponse.json();
                const teamsData: Team[] = await teamsResponse.json();
                const employeesData: Employee[] = await employeesResponse.json();

                setSectors(sectorsData);
                setTeams(teamsData);
                setEmployees(employeesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [companyId]);

    return { sectors, teams, employees };
};

export default useTaskData;