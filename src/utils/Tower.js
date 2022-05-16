// utils
import Stack from "./Stack";

class Tower {
  constructor(maxLength) {
    this.disks = new Stack();
    this.length = 0;
    this.maxLength = maxLength;
  }

  // add d disk to the top of a tower if the previous disk is smaller
  add(disk) {
    this.disks.push(disk);
    this.length++;
    return this;
  }

  // move a disk from one tower to another if is possible and remove the disk from the current tower
  moveTopTo(towerTarget) {
    if (
      towerTarget.disks.top === null ||
      this.disks.top.value < towerTarget.disks.top.value
    ) {
      towerTarget.disks.push(this.disks.top.value);
      towerTarget.length++;
      this.length--;
      this.disks.pop();
      return true;
    }
  }

  // automatic game solution 
  moveDisks(disks, towerTarget, towerHelper) {
    if (disks === 0) {
      return true;
    }
    if (disks === 1) {
      this.moveTopTo(towerTarget);
    }
    if (disks >= 2) {
      this.moveDisks(disks - 1, towerHelper, towerTarget);
      this.moveTopTo(towerTarget);
      towerHelper.moveDisks(disks - 1, towerTarget, this);
    }
    return true;
  }
}

export default Tower;