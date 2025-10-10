export function* generatSerialNumber() {
    let count = 0;
    while (true) {
        count++;
        yield count;
    }
}
