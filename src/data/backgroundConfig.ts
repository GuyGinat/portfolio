export type delayType = "rtl" | "ltr" | "utd" | "dtu" | "cto" | "otc";
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
    delayType: delayType | null;
    delay: number | null;
}

export const defaultBackgroundConfig: BackgroundConfig = {
    color1: "#eeeeee",
    color2: "#eeeeee",
    waveAmplitude: 0,
    waveFrequency: 0.3,
    waveSpeed: 4.5,        
    lightPosition: [0, 6, 5],
    cameraPosition: [0, 0, 8],
    cameraFov: 80,
    customColorsMap: null,    
    spacingOffset: 0,
    delayType: "cto",
    delay: 0,
}

export function createBackgroundConfig(config: Partial<BackgroundConfig>): BackgroundConfig {
    return {
        ...defaultBackgroundConfig,
        ...config,
    }
}

// Scroll percentage breakpoints for background transitions
// Maps scroll percentage (0-100) to background config names
export const scrollBreakpoints: Record<number, string> = {
    0: "base",
    25: "games",
    50: "tech",
    75: "contact",
    100: "beach",
};

export const backgroundConfigMaps: Record<string, BackgroundConfig> = {
    "default": defaultBackgroundConfig,
    "base": createBackgroundConfig({
        color1: "#4338ca",
        color2: "#7e22ce",
        lightPosition: [0, 6, 5],
        waveAmplitude: 1,
        waveFrequency: 0.5,
        waveSpeed: 2.5,
        cameraPosition: [0, 0, 8],
        cameraFov: 80,
        spacingOffset: 0.1,
        customColorsMap: null,
        delayType: "ltr",
        delay: 0,
    }),
    "start": createBackgroundConfig({
        color1: "#eeeeee",
        color2: "#eeeeee",
        waveAmplitude: 0,
        waveFrequency: 0,
        waveSpeed: 0,        
        spacingOffset: 0,
        delayType: "cto",
        delay: 0,
    }),
    "purple": createBackgroundConfig({
        color1: "#4338ca",
        color2: "#7e22ce",
        lightPosition: [0, 6, 5],
        waveAmplitude: 1.8,
        waveFrequency: 0.5,
        waveSpeed: 4.5,
        cameraPosition: [0, 0, 8],
        cameraFov: 80,
        spacingOffset: 0.1,
        customColorsMap: null,
        delayType: "rtl",
        delay: 0,
    }),
    "beach": createBackgroundConfig({
        color1: "#abcdef",
        color2: "#fedcba",
        lightPosition: [-5, 6, 5],
        waveAmplitude: 2,
        waveFrequency: 0.08,
        waveSpeed: -6,
        spacingOffset: 0.3,
    }),
    "games2": createBackgroundConfig({
        color1: "#123456",
        color2: "#654321",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
        cameraPosition: [0, 0, 8],
        cameraFov: 80,
        spacingOffset: 0.3,
        delayType: "rtl",
        delay: 0,
    }),
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
        delayType: "rtl",
        delay: 0,
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
        delayType: "utd",
        delay: 0,
    }),
    "writing": createBackgroundConfig({
        color1: "#eeeeee",
        color2: "#eeeeee",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.3,
        waveSpeed: -4.5,
        spacingOffset: -0.1,
        delayType: "ltr",
        delay: 0,
    }),
    "tech": createBackgroundConfig({
        color1: "#abcdef",
        color2: "#fedcba",
        lightPosition: [0, 6, 5],
        waveAmplitude: 0,
        waveFrequency: 0.1,
        waveSpeed: -1.5,
        delayType: "ltr",
        delay: 0,
    }),
}
