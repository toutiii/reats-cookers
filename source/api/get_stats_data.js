export function get_stats_data() {
  return {
    status: 200,
    ok: true,
    json: {
      data: {
        average_response_time: "15min",
        average_approval_rate: "99%",
        average_cancel_rate: "1%",
        average_rating: "4.4/5",
      },
    },
  };
}
