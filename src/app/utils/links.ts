enum routeNames {
  adminTurnInquiry = "turnInquiry",
  capacityList = "capacity-list",
  queueList = "queue-list",
  capacityManagement = "capacity-management",
  crossingList = "crossing-list",
  dashboard = "dashboard",
  dashboardHome = "dashboard-home",
  help = "help",
  home = "home",
  lastAddedQueueList = "last-added-queue-list",
  login = "login",
  manualQueueList = "manual-queue-list",
  queueListByDate = "queue-list-by-date",
  registerCrossing = "register-crossing",
  slots = "slots",
  timeSelect = "time-select",
  userLogin = "user-login",

  bzHome = "bz-home",
  rzHome = "rz-home",
  tcDashboard = "tc-dashboard",
  paymentResult = "payment-result",
}

export enum routeLinks {
  adminTurnInquiry = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.adminTurnInquiry,
  capacityList = "/" + routeNames.dashboard + "/" + routeNames.capacityList,
  queueList = "/" + routeNames.dashboard + "/" + routeNames.queueList,
  capacityManagement = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.capacityManagement,
  crossingList = "/" + routeNames.dashboard + "/" + routeNames.crossingList,
  dashboard = "/" + routeNames.dashboard,
  dashboardHome = "/" + routeNames.dashboard + "/" + routeNames.dashboardHome,
  help = "/" + routeNames.help,
  home = "/",
  login = "/" + routeNames.login,
  lastAddedQueueList = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.lastAddedQueueList,
  manualQueueList = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.manualQueueList,
  queueListByDate = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.queueListByDate,
  registerCrossing = "/" +
    routeNames.dashboard +
    "/" +
    routeNames.registerCrossing,
  slots = "/" + routeNames.slots,
  timeSelect = "/" + routeNames.timeSelect,
  userLogin = "/" + routeNames.userLogin,

  bzHome = "/" + routeNames.bzHome,
  rzHome = "/" + routeNames.rzHome,
  tcDashboard = "/" + routeNames.tcDashboard,
  paymentResult = "/" + routeNames.paymentResult,
}

export const Links = {
  adminTurnInquiry: {
    name: routeNames.adminTurnInquiry,
    route: routeLinks.adminTurnInquiry,
  },
  capacityList: {
    name: routeNames.capacityList,
    route: routeLinks.capacityList,
  },
  queueList: {
    name: routeNames.queueList,
    route: routeLinks.queueList,
  },
  capacityManagement: {
    name: routeNames.capacityManagement,
    route: routeLinks.capacityManagement,
  },
  crossingList: {
    name: routeNames.crossingList,
    route: routeLinks.crossingList,
  },
  dashboard: { name: routeNames.dashboard, route: routeLinks.dashboard },
  dashboardHome: {
    name: routeNames.dashboardHome,
    route: routeLinks.dashboardHome,
  },
  help: {
    name: routeNames.help,
    route: routeLinks.help,
  },
  home: { name: routeNames.home, route: routeLinks.home },
  lastAddedQueueList: {
    name: routeNames.lastAddedQueueList,
    route: routeLinks.lastAddedQueueList,
  },
  login: {
    name: routeNames.login,
    route: routeLinks.login,
  },
  manualQueueList: {
    name: routeNames.manualQueueList,
    route: routeLinks.manualQueueList,
  },
  queueListByDate: {
    name: routeNames.queueListByDate,
    route: routeLinks.queueListByDate,
  },
  registerCrossing: {
    name: routeNames.registerCrossing,
    route: routeLinks.registerCrossing,
  },
  slots: {
    name: routeNames.slots,
    route: routeLinks.slots,
  },
  timeSelect: {
    name: routeNames.timeSelect,
    route: routeLinks.timeSelect,
  },

  userLogin: {
    name: routeNames.userLogin,
    route: routeLinks.userLogin,
  },

  bzHome: {
    name: routeNames.bzHome,
    route: routeLinks.bzHome,
  },
  rzHome: {
    name: routeNames.rzHome,
    route: routeLinks.rzHome,
  },
  tcDashboard: {
    name: routeNames.tcDashboard,
    route: routeLinks.tcDashboard,
  },
  paymentResult: {
    name: routeNames.paymentResult,
    route: routeLinks.paymentResult,
  },
};
