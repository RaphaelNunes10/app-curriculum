import { ref } from "vue";

import { Preferences } from "@capacitor/preferences";

import { Curriculum } from "@/utils/types/curriculum.types";

export function useCrudCurriculum() {
  const curricula = ref<Curriculum[]>([]);

  const fetchCurriculum = async () => {
    const { value } = await Preferences.get({ key: "curricula" });

    value ? (curricula.value = JSON.parse(value)) : (curricula.value = []);
  };

  const createCurriculum = async (curriculum: Curriculum) => {
    curricula.value.push(curriculum);

    await Preferences.set({
      key: "curricula",
      value: JSON.stringify(curricula.value),
    });

    await fetchCurriculum();
  };

  const updateCurriculum = async (index: number, curriculum: Curriculum) => {
    curricula.value[index] = curriculum;

    await Preferences.set({
      key: "curricula",
      value: JSON.stringify(curricula.value),
    });

    await fetchCurriculum();
  };

  const deleteCurriculum = async (id: number) => {
    const index = curricula.value.findIndex((curriculum) =>
      curriculum.id === id
    );
    curricula.value.splice(index, 1);

    await Preferences.set({
      key: "curricula",
      value: JSON.stringify(curricula.value),
    });

    await fetchCurriculum();
  };

  return {
    curricula,
    fetchCurriculum,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum,
  };
}
