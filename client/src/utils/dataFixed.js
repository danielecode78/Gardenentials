export const dataFixed = (data) => {
  const fix = (value) => {
    if (value instanceof Date) return value;
    if (value?.toDate instanceof Function) return value.toDate();
    return value;
  };

  return {
    ...data,
    history: {
      ...data.history,
      plantedAt: fix(data.history?.plantedAt),
      lastFertilized: {
        ...data.history?.lastFertilized,
        dateFertilizing: fix(data.history?.lastFertilized?.dateFertilizing),
      },
      lastPruned: {
        ...data.history?.lastPruned,
        datePruning: fix(data.history?.lastPruned?.datePruning),
      },
      treatments:
        data.history?.treatments?.map((t) => ({
          ...t,
          dateTreatment: fix(t.dateTreatment),
        })) ?? [],
    },
    nextActions: {
      ...data.nextActions,
      nextFertilization: {
        ...data.nextActions?.nextFertilization,
        dateFertilizing: fix(
          data.nextActions?.nextFertilization?.dateFertilizing
        ),
      },
      nextPruning: {
        ...data.nextActions?.nextPruning,
        datePruning: fix(data.nextActions?.nextPruning?.datePruning),
      },
      nextTreatment: {
        ...data.nextActions?.nextTreatment,
        dateTreatment: fix(data.nextActions?.nextTreatment?.dateTreatment),
      },
    },
  };
};
