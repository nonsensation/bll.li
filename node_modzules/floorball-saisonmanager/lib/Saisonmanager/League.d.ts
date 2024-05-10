export interface League {
    id: number;
    game_operation_id: number;
    game_operation_name: string;
    game_operation_short_name: string;
    game_operation_slug: string;
    league_category_id: string;
    league_interface_id: string;
    league_system_id: string;
    league_type: string;
    name: string;
    female: boolean;
    enable_scorer: boolean;
    short_name: string;
    season_id: string;
    order_key: string;
    game_day_numbers: number[];
    game_day_titles: GameDayTitle[];
    deadline?: string;
    before_deadline?: string;
    legacy_league: boolean;
    field_size?: FieldSize;
    league_modus?: LeagueMode;
    has_preround?: boolean;
    table_modus: TableMode;
    periods: number;
    period_length: number;
    overtime_length: number;
    similar_leagues?: League[];
}
export interface GameDayTitle {
    game_day_number: number;
    title: string;
}
export declare enum FieldSize {
    GF = "GF",
    KF = "KF"
}
export declare enum LeagueMode {
    League = "league"
}
export declare enum TableMode {
    Classic = "classic"
}
export interface LeaguePreview {
    id: number;
    operation_id: number;
    game_operation: string;
    season: string;
    name: string;
    order_key: string;
    link: string;
    link_schedule: string;
}
