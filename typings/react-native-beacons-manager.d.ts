
declare module 'react-native-beacons-manager' {

  import { EmitterSubscription } from "react-native";

  export interface BeaconRegion {
    identifier: string,
    uuid: string,
    minor?: number,
    major?: number
  }

  export type AuthorizationStatus =
    | 'authorizedAlways'
    | 'authorizedWhenInUse'
    | 'denied'
    | 'notDetermined'
    | 'restricted';

  export type BeaconUUID = string

  interface BeaconRegion {
    identifier: string
    uuid: BeaconUUID
  }

  export enum BeaconProximity {
    UNKNOWN = "unknown",
    FAR = "far",
    NEAR = "near",
    immediate = "immediate"
  }

  export interface BeaconS {
    uuid: BeaconUUID
    major: number
    minor: number
    rssi: number
    proximity: BeaconProximity
    accuracy: any // @TODO
  }

  interface BeaconEventDidRange {
    region: BeaconRegion
    beacons: BeaconS[]
  }

  interface BeaconEventDidDetermineState{
    state: 'inside' | 'outside' | 'unknown'
    region: BeaconRegion
  }

  class BeaconsEventEmitter {

    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon
    addListener(event: 'didDetermineState', callback: (data: BeaconEventDidDetermineState) => void): EmitterSubscription

    addListener(event: 'beaconsDidRange', callback: (data: BeaconEventDidRange) => void): EmitterSubscription
  }

  class Beacons {

    BeaconsEventEmitter: BeaconsEventEmitter

    ///////////////////////////////////////////////////////
    // iOS only
    ///////////////////////////////////////////////////////
    manualInitialization(): void;

    requestAlwaysAuthorization(): void;

    requestWhenInUseAuthorization(): void;

    allowsBackgroundLocationUpdates(
      allow: boolean
    ): void;

    getAuthorizationStatus(
      callback: (status: AuthorizationStatus) => any
    ): any;

    startUpdatingLocation(): void;

    stopUpdatingLocation(): void;

    shouldDropEmptyRanges(
      drop: boolean
    ): void;

    ///////////////////////////////////////////////////////
    // android only
    ///////////////////////////////////////////////////////
    ARMA_RSSI_FILTER: string;
    RUNNING_AVG_RSSI_FILTER: string;
    PARSER_IBEACON: string;
    PARSER_ESTIMOTE: string;
    PARSER_ALTBEACON: string;
    PARSER_EDDYSTONE_TLM: string;
    PARSER_EDDYSTONE_UID: string;
    PARSER_EDDYSTONE_URL: string;

    setHardwareEqualityEnforced(
      flag: boolean
    ): void;

    detectIBeacons(): void;

    detectAltBeacons(): void;

    detectEstimotes(): void;

    detectEddystoneUID(): void;

    detectEddystoneURL(): void;

    detectEddystoneTLM(): void;

    detectCustomBeaconLayout(
      parser: number
    ): void;

    setBackgroundScanPeriod(
      period: number
    ): void;

    setBackgroundBetweenScanPeriod(
      period: number
    ): void;

    setForegroundScanPeriod(
      period: number
    ): void;

    setRssiFilter(
      filterType: number,
      avgModifier: number
    ): void;

    getRangedRegions(): Promise<any>;

    getMonitoredRegions(): Promise<Array<BeaconRegion>>;

    checkTransmissionSupported(): Promise<number>;

    ///////////////////////////////////////////////////////
    // common iOS and Android
    ///////////////////////////////////////////////////////

    startMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    startRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<any>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<any>;

    stopMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    stopRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<any>;

    requestStateForRegion(
      region: BeaconRegion
    ): void;
  }

  const beacons: Beacons;
  export default beacons;  
}

