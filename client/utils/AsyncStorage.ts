import AsyncStorage from "@react-native-async-storage/async-storage";


export async function setUserID(value:string | undefined ) : Promise<void>{
    try {
        value ? await AsyncStorage.setItem('userID', JSON.stringify(value)) : await AsyncStorage.removeItem('userID');
        
    } catch (error) {
        console.log(error);
    }
}

export async function getUserID() : Promise<string|undefined> {
    try {
        const hello = await AsyncStorage.getItem('userID');
        return hello ? JSON.parse(hello) : undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function setSelectedCaf(value:string) : Promise<void>{
    try {
        await AsyncStorage.setItem('selectedCaf', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function getSelectedCaf() : Promise<string> {
    try {
        const hello = await AsyncStorage.getItem('selectedCaf');
        return hello ? JSON.parse(hello) : "";
    } catch (error) {
        console.log(error);
        return "";
    }
}

export async function setFilters(value:string[]) : Promise<void>{
    try {
        await AsyncStorage.setItem('filters', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function getFilters() : Promise<string[]> {
    try {
        const hello = await AsyncStorage.getItem('filters');
        return hello ? JSON.parse(hello) : ["A-Z", "Nearby", "Fav Foods"];
    } catch (error) {
        console.log(error);
        return [];
    }
}