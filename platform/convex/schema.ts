import { defineSchema, defineTable } from 'convex/server';
import { userFields, applicationFields, reviewFields, eventFields, emailFields } from './validators';
import { storedEventFields, observationFields, syncFields } from './lumaModel';
export default defineSchema({
  lumaEvents: defineTable(storedEventFields).index('by_startAt', ['startAt']).index('by_lumaId', ['lumaId']),
  lumaObservations: defineTable(observationFields).index('by_day', ['day']).index('by_lumaId_and_day', ['lumaId', 'day']),
  lumaSync: defineTable(syncFields).index('by_calendarId', ['calendarId']),
  users: defineTable(userFields).index('by_tokenIdentifier', ['tokenIdentifier']).index('by_email', ['email']).index('by_resident', ['resident']).index('by_admin', ['admin']),
  applications: defineTable(applicationFields).index('by_owner', ['owner']).index('by_submitted_and_state', ['submitted', 'state']).searchIndex('search_name', { searchField: 'applicantName', filterFields: ['submitted', 'state', 'flagged'] }),
  reviews: defineTable(reviewFields).index('by_applicationId_and_reviewer', ['applicationId', 'reviewer']),
  auditEvents: defineTable(eventFields).index('by_applicationId', ['applicationId']),
  emailDeliveries: defineTable(emailFields).index('by_applicationId_and_kind', ['applicationId', 'kind']).index('by_state', ['state']),
});
