"use client";

import { useState, useMemo } from "react";
import type { PatientListItem } from "@/types/patient";
import { PatientFilters } from "./patient-filters";
import { PatientTable } from "./patient-table";
import { PatientPagination } from "./patient-pagination";

interface PatientListContainerProps {
  patients: PatientListItem[];
}

const ITEMS_PER_PAGE = 10;

export function PatientListContainer({ patients }: PatientListContainerProps) {
  const [statusFilter, setStatusFilter] = useState("");
  const [physicianFilter, setPhysicianFilter] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (statusFilter && p.status !== statusFilter) return false;
      if (physicianFilter && p.physician !== physicianFilter) return false;
      if (wardFilter && p.ward !== wardFilter) return false;
      return true;
    });
  }, [patients, statusFilter, physicianFilter, wardFilter]);

  // Reset to page 1 when filters change
  function handleFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setCurrentPage(1);
    };
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-4">
      <PatientFilters
        statusFilter={statusFilter}
        physicianFilter={physicianFilter}
        wardFilter={wardFilter}
        onStatusChange={handleFilterChange(setStatusFilter)}
        onPhysicianChange={handleFilterChange(setPhysicianFilter)}
        onWardChange={handleFilterChange(setWardFilter)}
      />

      <PatientTable patients={paginated} />

      <PatientPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
