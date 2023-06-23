export class CounterService {
    activeToInactiveCounter = 0;
    inactiveToActiveCouneter = 0;

    incrementActiveToInactive() {
        this.activeToInactiveCounter++;
        console.log('Active to Inactive: ' + this.activeToInactiveCounter);
    }
    incrementInactiveToActive() {
        this.inactiveToActiveCouneter++;
        console.log('Inactive to active: ' + this.inactiveToActiveCouneter);
    }
}