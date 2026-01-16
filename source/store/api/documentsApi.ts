import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  AttestationSubmitRequest,
  AttestationSubmitResponse,
} from "./types";

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /cookers/{cooker_id}/attestation/ - Submit attestation documents
    submitAttestation: builder.mutation<
      ApiResponse<AttestationSubmitResponse>,
      AttestationSubmitRequest
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("business_document_type", data.business_document_type);
        formData.append("business_document", data.business_document);
        formData.append("rc_insurance_document", data.rc_insurance_document);
        formData.append("attestation_accepted", String(data.attestation_accepted));

        return {
          url: `/cookers/${data.cooker_id}/attestation/`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Cooker"],
    }),

    // GET /cookers/{cooker_id}/attestation/ - Get attestation status
    getAttestationStatus: builder.query<
      ApiResponse<AttestationSubmitResponse>,
      { cooker_id: number }
    >({
      query: ({ cooker_id }) => ({
        url: `/cookers/${cooker_id}/attestation/`,
        method: "GET",
      }),
      providesTags: ["Cooker"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitAttestationMutation,
  useGetAttestationStatusQuery,
} = documentsApi;
