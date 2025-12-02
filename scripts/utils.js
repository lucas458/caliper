const clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;  
};