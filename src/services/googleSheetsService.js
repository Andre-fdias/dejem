import { APP_CONFIG } from '../config/constants';
import { normalizeRow } from '../utils/normalizationUtils';
import { cacheService } from './cacheService';

export const googleSheetsService = {
    async fetchEscalas() {
        try {
            const url = `https://docs.google.com/spreadsheets/d/${APP_CONFIG.spreadsheetId}/gviz/tq?tqx=out:json&gid=${APP_CONFIG.sheetGid}`;
            const response = await fetch(url);
            const text = await response.text();
            
            // The response comes wrapped as: /*O_o*/\n google.visualization.Query.setResponse({...});
            const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
            if (!match) throw new Error("Invalid response format from Google Sheets");
            
            const jsonString = match[1];
            const data = JSON.parse(jsonString);

            const cols = data.table.cols.map(c => c.label ? c.label.trim() : "");
            const rows = data.table.rows.map(r => {
                const rowObj = {};
                cols.forEach((colName, index) => {
                    if (colName) {
                        const cell = r.c[index];
                        // .f is formatted value, .v is raw value
                        rowObj[colName] = cell ? (cell.f || cell.v) : "";
                    }
                });
                return normalizeRow(rowObj);
            });

            const validRows = rows.filter(r => r && r.id);
            cacheService.saveData(validRows);
            return { data: validRows, source: 'online', timestamp: new Date() };

        } catch (error) {
            console.error("Error fetching Google Sheets data:", error);
            const cached = cacheService.getData();
            if (cached) {
                return { data: cached.data, source: 'cache', timestamp: cached.timestamp };
            }
            throw new Error("Não foi possível carregar os dados e não há cache disponível.");
        }
    }
};
