export const toMailDetail = (mailId: string) => "/mail/" + mailId;

export default {
  ROOT: "/",
  MAIL_LIST: "/mail",
  MAIL_DETAIL: "/mail/:id",
  CONFIG: "/config",
}