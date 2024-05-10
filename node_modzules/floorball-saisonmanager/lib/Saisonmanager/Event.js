"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenaltyType = exports.PenaltyReason = exports.GoalType = exports.EventTeam = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["Goal"] = "goal";
    EventType["Timeout"] = "timeout";
    EventType["Penalty"] = "penalty";
})(EventType || (exports.EventType = EventType = {}));
var EventTeam;
(function (EventTeam) {
    EventTeam["Home"] = "home";
    EventTeam["Guest"] = "guest";
})(EventTeam || (exports.EventTeam = EventTeam = {}));
var GoalType;
(function (GoalType) {
    GoalType["Regular"] = "regular";
    GoalType["Owngoal"] = "owngoal";
})(GoalType || (exports.GoalType = GoalType = {}));
var PenaltyReason;
(function (PenaltyReason) {
    // 907 Stoßen
})(PenaltyReason || (exports.PenaltyReason = PenaltyReason = {}));
var PenaltyType;
(function (PenaltyType) {
    PenaltyType["Penalty_2"] = "penalty_2";
    PenaltyType["Penalty_2and2"] = "penalty_2and2";
    PenaltyType["Penalty_5"] = "penalty_5";
    PenaltyType["Penalty_10"] = "penalty_10";
    PenaltyType["Penalty_ms_tech"] = "penalty_ms_tech";
    PenaltyType["Penalty_ms_full"] = "penalty_ms_full";
    PenaltyType["Penalty_ms1"] = "penalty_ms1";
    PenaltyType["Penalty_ms2"] = "penalty_ms2";
    PenaltyType["Penalty_ms3"] = "penalty_ms3";
})(PenaltyType || (exports.PenaltyType = PenaltyType = {}));
//# sourceMappingURL=Event.js.map