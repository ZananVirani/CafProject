import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Setter method for the user id.
 * @param value id to be set.
 */
export async function setUserID(value:string | undefined ) : Promise<void>{
    try {
        value ? await AsyncStorage.setItem('userID', JSON.stringify(value)) : await AsyncStorage.removeItem('userID');
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * Getter Method for the user id.
 * @returns the user id.
 */
export async function getUserID() : Promise<string|undefined> {
    try {
        const hello = await AsyncStorage.getItem('userID');
        return hello ? JSON.parse(hello) : undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/**
 * Setter Method for the selected cafeteria on the main screen.
 * @param value Selected Cafeteria
 */
export async function setSelectedCaf(value:string) : Promise<void>{
    try {
        await AsyncStorage.setItem('selectedCaf', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

/**
 * Getter method for the selected cafeteria on the main screen.
 * @returns the selected cafeteria.
 */
export async function getSelectedCaf() : Promise<string> {
    try {
        const hello = await AsyncStorage.getItem('selectedCaf');
        return hello ? JSON.parse(hello) : "";
    } catch (error) {
        console.log(error);
        return "";
    }
}

/**
 * Setter method for the order of the filters on the main screen.
 * @param value Order of the filters.
 */
export async function setFilters(value:string[]) : Promise<void>{
    try {
        await AsyncStorage.setItem('filters', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

/**
 * Getter method for the order of the filters on the main screen.
 * @returns the order of the filters.
 */
export async function getFilters() : Promise<string[]> {
    try {
        const hello = await AsyncStorage.getItem('filters');
        return hello ? JSON.parse(hello) : ["A-Z", "Nearby", "Fav Foods"];
    } catch (error) {
        console.log(error);
        return [];
    }
}