export type doorlockStatusProps = "created" | "installed";

export type userRoleStatusProps = "master" | "guest" | "";

export type staffRoleStatusProps = "master" | "manager" | "housekeeping" | "manager_mobilekey" | "doorlock_setting" | "";

export type staffStatusProps = "granting" | "granted";

export type reportDataExcelStateProps = "userkey" | "facility" | "staff" | "user_mobilekey";

export type reportKeyTypeStateProps = "mobilekey" | "pincode" | "cardkey" | "cardkey_master" | "cardkey_ble" | "cardkey_init";

export type pincodeTypeStateProps = "day" | "hour" | "10mins";

export type roomsProps = {
    name: string
}
  
export type reportJsonDiffsFormatterProps = {
    key: string,
    oldValue: string,
    newValue: string,
}

/* DoorLock */
export type doorlockFormatterTypeProps = "commonroom" | "room" | "building" | "floor" | "elevator" | "keytag";

export type doorlockFormatterFwTypeProps = 1|2|3|4|60|71|72|73|74|75|76|81|82|83|84|85|86|87|88|89|90|91|92|93|94|111|112|113|114|115|116|119|121|122
|124|125|128|129|130|131|140|150|151|160|161|162|170|171|172|173|174|175|176|177|178|179|180|181|182|190|191|192|193|194|195|196|197|198|199|200
|201|202|203|204|205|206|207|208;

export type doorlockBlockResultProps = 0|1|2|3|4|5|6|7|8|9|10|11|17;

export type doorlockBlockAuthProps = "C1"|"C2"|"C3"|"C4"|"C5"|"C6";

export type blockCardTypeProps = 0|10|20|21|22|23|24|30|31|32|33|34|40|41|42|43|44|45|46|47|48|49|"4A"|"4B"|"4C"|"4D"|"FF"|"E7"|"E9"|"E1"|80;

export type blockPincodeDeleteProps = "241"|"242"|"244"|"248";

export type blockSetupResultProps = 0|1;

export type blockResetReasonProps = 0|1|2|3;

export type blockResetTypeProps = "00"|"01"|"02"|"04"|"08"|"10"|"20"|"40"|"80";

export type logFormatterProps = 64|65|66|67|68|69|70|71|72|73|74|75|76|77|78|79|"64"|"78";

export type languageTypeStateProps = 1|2|3|4|60|71|72|73|74|75|76|81|82|83|84|85|86|87|88|89|90|91|92|93|94|111|112|113|114|115|116|119|121|122
|124|125|128;

export type keytagStatusProps = "created" | "installed" | "updated";