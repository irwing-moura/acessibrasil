// ******************** LOCAL STORAGE ********************//

export function setItemToLocalStorageWithExpiry(key, value, percentage, btnid, isRange) {

    const newDate = addDays(new Date(), 2);

    const item = {
        value: value,
        percentage: percentage,
        expiry: newDate.getTime(),
    }
    localStorage.setItem(key, JSON.stringify(item))
    if(btnid != null) {
        if(isRange){
            //RANGE
            localStorage.setItem(btnid, value);
        }else {
            //ACTIVATE
            localStorage.setItem(btnid, 1);
        }
    }
}

// export function setItemGroup(btnId) {
//
//     localStorage.setItem(btnId, 1);
//
//     if(btnid != null) {
//         if(isRange){
//             //RANGE
//             localStorage.setItem(btnid, value);
//         }else {
//             //ACTIVATE
//             localStorage.setItem(btnid, 1);
//         }
//     }
//
// }

export function getItemFromLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        removeItemFromLocalStorage(key);
        return null
    }
    return item;
}

export function removeItemFromLocalStorage(key, btnId) {
    localStorage.removeItem(key);
    if(btnId != null) {
        localStorage.setItem(btnId, 0);
    }
}

// export function changeItemGroup(btnId) {
//     if(btnId != null) {
//         localStorage.setItem(btnId, 0);
//     }
// }

export function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}

function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

