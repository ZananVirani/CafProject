import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setIntro(value:boolean) : Promise<void>{
    try {
        await AsyncStorage.setItem('intro', JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function getIntro() : Promise<boolean> {
    try {
        const hello = await AsyncStorage.getItem('intro');
        return hello ? JSON.parse(hello) : true;
    } catch (error) {
        console.log(error);
        return false;
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
        return hello ? JSON.parse(hello) : ["Favourites", "Nearby", "Rating"];
    } catch (error) {
        console.log(error);
        return [];
    }
}