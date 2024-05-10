import type { Arena } from "./Arena";
import type { Team, Club } from "./Team";
export declare const SmBaseUrl = "https://saisonmanager.de";
export declare const SmApi = "https://saisonmanager.de/api/v2";
export declare class Saisonmanager {
    fetch: any;
    constructor(fetch: () => Promise<void>);
    getAdminLeagueAdditionalReferencesUrl(leagueId: number): Promise<{
        arenas: Arena;
        teams: Team;
        clubs: Club;
    }>;
}
export declare class UrlBuilder {
    static getAdminLeagueAdditionalReferencesUrl(leagueId: number): string;
    static getMatchSheduleUrl: (leagueId: number) => string;
    static getLogoUrl: (logoPath: string) => string;
    static getMatchReportUrl: (gameId: number, leagueId: number, operationSlug: string) => string;
    static getLeagueUrl: (leagueId: number) => string;
    static getPenaltyCodesUrl: () => string;
    static getPenaltiesUrl: () => string;
}
