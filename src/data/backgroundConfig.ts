export type customColorsMap = {
    [key: string]: {
        color1: string;
        color2: string;
    }
}

export type BackgroundConfig = {
    color1: string;
    color2: string;
    lightPosition: [number, number, number];
    waveAmplitude: number;
    waveFrequency: number;
    waveSpeed: number;
    cameraPosition: [number, number, number];
    cameraFov: number;
    spacingOffset: number;
    customColorsMap: customColorsMap | null;
}

export const defaultBackgroundConfig: BackgroundConfig = {
    color1: "#4338ca",
    color2: "#7e22ce",
    lightPosition: [0, 6, 5],
    waveAmplitude: 1.8,
    waveFrequency: 0.3,
    waveSpeed: 4.5,
    cameraPosition: [0, 0, 8],
    cameraFov: 80,
    spacingOffset: 0.1,
    customColorsMap: null,
}

export function createBackgroundConfig(config: Partial<BackgroundConfig>): BackgroundConfig {
    return {
        ...defaultBackgroundConfig,
        ...config,
    }
}

export const backgroundConfigMaps: Record<string, BackgroundConfig> = {
    "default": defaultBackgroundConfig,
    "games": createBackgroundConfig({
        color1: "#123456",
        color2: "#654321",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
        cameraPosition: [0, 0, 8],
        cameraFov: 80,
        spacingOffset: 0.3,
    }),
    "about": createBackgroundConfig({
        color1: "#abcdef",
        color2: "#fedcba",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
        cameraPosition: [0, 0, 8],
        cameraFov: 80,
        spacingOffset: 2,
    }),
    "writing": createBackgroundConfig({
        color1: "#eeeeee",
        color2: "#dddddd",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
        spacingOffset: 0,
    }),
    "tech": createBackgroundConfig({
        color1: "#0fe56a",
        color2: "#9dc123",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
    }),
}
