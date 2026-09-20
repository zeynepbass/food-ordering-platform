import { useMemo } from "react";
import Title from "@/components/common/Title";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import useFetch from "@/hooks/useFetch";
import reservationService from "@/services/reservationService";

const ReservationManager = () => {
  const { data: reservations } = useFetch(reservationService.getAll, []);

  const upcoming = useMemo(
    () => [...reservations].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [reservations]
  );

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Reservations</Title>
      <div className="overflow-x-auto w-full mt-5">
        <DataTable headers={["NAME", "PHONE", "EMAIL", "PERSONS", "DATE"]}>
          {upcoming.map((reservation) => (
            <DataRow key={reservation._id}>
              <DataCell>{reservation.fullName}</DataCell>
              <DataCell>{reservation.phoneNumber}</DataCell>
              <DataCell>{reservation.email}</DataCell>
              <DataCell>{reservation.persons}</DataCell>
              <DataCell>{new Date(reservation.date).toLocaleString()}</DataCell>
            </DataRow>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default ReservationManager;
