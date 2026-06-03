import { seedRecruiterInsights } from "../data/seedData";
import type { RecruiterInsights } from "../types";

export function mockGetRecruiterInsights(): RecruiterInsights {
  return seedRecruiterInsights;
}
