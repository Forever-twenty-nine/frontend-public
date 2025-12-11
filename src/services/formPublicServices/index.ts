import api from "@/utils/axiosinstance";
import { IIWANTOTRAIN } from "@/types";

export const createIWantToTrain = async (data: IIWANTOTRAIN): Promise<void> => {
  try {
    const resp = await api.post(`/api/fetch?path=/createIWantToTrain`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error in createIWantToTrain:", error);
    throw error;
  }
};

export const requestACourse = async (data: IIWANTOTRAIN): Promise<void> => {
  try {
    const resp = await api.post(`/api/fetch?path=/createRequestACourse`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error in requestACourse:", error);
    throw error;
  }
};

export interface IBusinessTraining {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}
export const createBusinessTraining = async (
  data: IBusinessTraining,
): Promise<void> => {
  try {
    const resp = await api.post(
      `/api/fetch?path=/createBusinessTraining`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (resp.status !== 200) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error in createBusinessTraining:", error);
    throw error;
  }
};
