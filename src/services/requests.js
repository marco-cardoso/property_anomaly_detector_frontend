

export async function getAmomalies({filters}) {
    try {
        const response = await fetch(
            `http://0.0.0.0:5000/anomalies`
        );
        const anomalies = await response.json();
        return anomalies;
    } catch (error) {
        console.error(error);
        return null;
    }
}