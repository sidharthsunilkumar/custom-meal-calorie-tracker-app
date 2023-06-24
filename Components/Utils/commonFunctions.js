
export function convertToDateString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
    let day = date.getDate();

    let dateStr = `${year}-${month}-${day}`;
    return dateStr;
}

export function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

export function calculateNutrition(nutrition, consumedQuantity, mealInfoQuantity) {
    let newNutrition = nutrition * consumedQuantity / mealInfoQuantity;
    if (newNutrition % 1 !== 0) {
        newNutrition = parseFloat(newNutrition.toFixed(2));
    } else {
        newNutrition = parseInt(newNutrition);
    }
    return newNutrition;
}

export function calculateConsumedPercentage(consumed, goal) {
    let percent = null;
    if( consumed && goal && consumed!="" && goal!=""){
        percent = goal == '0' ? 100 : Math.floor(
            (consumed / goal) * 100
        );
    }
    return percent
}