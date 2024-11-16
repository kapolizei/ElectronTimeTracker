export const formatTotalTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}

export const easyFormatTotalTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${minutes}:${seconds}`;
}
export const FormatMin = (totalMinutes) => {
        const minutes = parseFloat(totalMinutes);
        if (isNaN(minutes)) {
                return "Invalid input: totalMinutes must be a number";
        }
        const totalSeconds = minutes * 60;
        const hours = Math.floor(totalSeconds / 3600);
        const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = (totalSeconds % 60).toFixed(0);

        return `${hours} hours ${remainingMinutes} minutes ${seconds} seconds`;
}

export const format = (totalTime) => {
        const totalMinutes = parseFloat(totalTime.replace(" минут", ""));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60);
        return `${hours} ч ${minutes} мин`;
};