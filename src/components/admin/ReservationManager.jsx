import { FiCalendar } from "react-icons/fi";
import DataState from "@/components/common/DataState";
import { DataCell, DataRow, DataTable } from "@/components/common/DataTable";
import useFetch from "@/hooks/useFetch";
import reservationService from "@/services/reservationService";
import { formatDateTime } from "@/utils/format";

const ReservationManager = () => {
  const { data: reservations, loading, error, refetch } = useFetch(
    reservationService.getAll,
    []
  );
  const now = new Date();

  return (
    <div className="card overflow-hidden">
      <DataState
        loading={loading}
        error={error}
        onRetry={refetch}
        isEmpty={reservations.length === 0}
        empty={{
          icon: FiCalendar,
          title: "No reservations yet",
          text: "Table bookings made on the site will appear here.",
        }}
      >
        <DataTable caption="Reservations" headers={["Guest", "Contact", "Guests", "Date", "Status"]}>
          {reservations.map((reservation) => {
            const isUpcoming = new Date(reservation.date) >= now;

            return (
              <DataRow key={reservation._id}>
                <DataCell className="font-semibold text-secondary">{reservation.fullName}</DataCell>
                <DataCell>
                  <span className="block">{reservation.phoneNumber}</span>
                  <span className="block text-xs text-muted">{reservation.email}</span>
                </DataCell>
                <DataCell>{reservation.persons}</DataCell>
                <DataCell>{formatDateTime(reservation.date)}</DataCell>
                <DataCell>
                  <span className={`badge ${isUpcoming ? "badge-success" : "badge-neutral"}`}>
                    {isUpcoming ? "Upcoming" : "Past"}
                  </span>
                </DataCell>
              </DataRow>
            );
          })}
        </DataTable>
      </DataState>
    </div>
  );
};

export default ReservationManager;
