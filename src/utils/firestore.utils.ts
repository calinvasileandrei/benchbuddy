const autoId = (): string => {
    const CHARS =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoIdValue = '';

    for (let i = 0; i < 20; i++) {
        autoIdValue += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoIdValue;
};
const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: any) => snap.data() as T,
});

export const firestoreUtils = {
    autoId,
    converter,
};
