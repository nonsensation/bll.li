"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlBuilder = exports.Saisonmanager = exports.SmApi = exports.SmBaseUrl = void 0;
exports.SmBaseUrl = 'https://saisonmanager.de';
exports.SmApi = `${exports.SmBaseUrl}/api/v2`;
class Saisonmanager {
    constructor(fetch) {
        this.fetch = null;
        this.fetch = fetch;
    }
    getAdminLeagueAdditionalReferencesUrl(leagueId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = UrlBuilder.getAdminLeagueAdditionalReferencesUrl(leagueId);
            const response = yield this.fetch(url);
            const json = yield response.json();
            return {
                arenas: json['arenas'],
                teams: json['teams'],
                clubs: json['clubs'],
            };
        });
    }
}
exports.Saisonmanager = Saisonmanager;
// https://saisonmanager.de/api/v2/game_operations/6/leagues.json
class UrlBuilder {
    static getAdminLeagueAdditionalReferencesUrl(leagueId) {
        return `${apiUrl}/admin/leagues/${leagueId}/additional_references.json`;
    }
}
exports.UrlBuilder = UrlBuilder;
UrlBuilder.getMatchSheduleUrl = function (leagueId) {
    return `${exports.SmApi}/leagues/${leagueId}/schedule.json`;
};
UrlBuilder.getLogoUrl = function (logoPath) {
    console.assert(logoPath.startsWith('/'));
    return `${exports.SmBaseUrl}${logoPath}`;
};
UrlBuilder.getMatchReportUrl = function (gameId, leagueId, operationSlug) {
    // https://saisonmanager.de/game_operation_slug/league_id/spiel/game_id
    // https://saisonmanager.de/ost/1396/spiel/32215
    return `${exports.SmBaseUrl}/${operationSlug}/${leagueId}/spiel/${gameId}`;
};
UrlBuilder.getLeagueUrl = function (leagueId) {
    // https://saisonmanager.de/api/v2/leagues/1396.json
    return `${exports.SmApi}/leagues/${leagueId}.json`;
};
UrlBuilder.getPenaltyCodesUrl = function () {
    // returns PenaltyInfo[]
    return `${exports.SmApi}/user/leagues/penalty_codes.json`;
};
UrlBuilder.getPenaltiesUrl = function () {
    // returns Penalty[]
    return `${exports.SmApi}/user/leagues/penalties.json`;
};
//# sourceMappingURL=Api.js.map