function generateShades(hexColor: string): string[] {
    const numShades = 6;
    const percentStep = 17;
    const rgbColor = hexToRgb(hexColor);

    if (!rgbColor) {
        throw new Error('Invalid hex color code');
    }

    const shades = [];

    for (let i = 0; i < numShades; i++) {
        const shadePercent = i * percentStep;
        const shadeRgbColor = shadeColor(rgbColor, shadePercent);
        const shadeHexColor = rgbToHex(shadeRgbColor);
        shades.push(shadeHexColor);
    }

    return shades;
}

function hexToRgb(hex: string): number[] | null {
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

    if (!match) {
        return null;
    }

    const [, red, green, blue] = match;

    return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)];
}

function shadeColor(rgbColor: number[], percent: number): number[] {
    const factor = percent / 100;

    const red = Math.round(rgbColor[0] * (1 - factor));
    const green = Math.round(rgbColor[1] * (1 - factor));
    const blue = Math.round(rgbColor[2] * (1 - factor));

    return [red, green, blue];
}

function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(rgbColor: number[]): string {
    const [red, green, blue] = rgbColor;

    return (
        '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue)
    );
}

export const colorUtils = {
    generateShades,
};
