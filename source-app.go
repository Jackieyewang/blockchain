package main

import (
	"encoding/json"
    "fmt"
  //  "strconv"
  //  "strings"

    "github.com/hyperledger/fabric/tree/release-1.1/core/chaincode/shim"
    pb "github.com/hyperledger/fabric/tree/release-1.1/protos/peer"
)
type CollegeChainCode struct{	
}

//member数据结构体
type Member struct{
    MemberID string `json:MemberID`                             //帐号ID
      //密码
    MemberInfo PeerInfo `json:MemberInfo`                  //帐号信息
    Memberproduct []ProInfo `json:Memberproduct`                  //个人产权
    Memberpermission []Permission `json:Memberpermission`           //个人权限
    Wallet WalletInfo `json:Wallet`                  //WALLET
}

type MemberAllInfo struct{
    MemberID string `json:MemberID`
    MemberInfo PeerInfo `json:MemberInfo`
    Memberproduct []ProInfo `json:Memberproduct`
    Wallet []WalletInfo `json:Wallet`
}

//生产信息
type PeerInfo struct{
    MemberPetName string `json:MemberPetName`                         //昵称
    sex string `json:sex`                         //性别
   // FoodMFGDate string `json:FoodMFGDate`                   //出生日期
   // FoodEXPDate string `json:FoodEXPDate`                  
   MemberProfile string `json:MemberProfile`                   //个人简介
   /* 身份证和真名待定，如果要设必须只能自己可见*/                         
    MemberIDcard string `json:MemberIDcard`                         //身份证
    MemberName string `json:MemberName`                 //真名
    /*  */
    MemberDevo string `json:MemberDevo`                 //贡献度
    MemberEmail string `json:MemberEmail`                 //邮箱
}
type ProInfo struct{
    ProID string `json:ProID`                               //产权ID
    ProName string `json:ProName`                           //产权名称
    Speech string `json:Speech`                           //产权内容
}
//个人权限
type Permission struct{
    ProID string `json:ProID`                               //产权ID
}

type WalletInfo struct{                               
    LogDepartureTm string `json:LogDepartureTm`             //出发时间
    LogArrivalTm string `json:LogArrivalTm`                 //到达时间
    LogMission string `json:LogMission`                     //处理业务(储存or运输)
    LogDeparturePl string `json:LogDeparturePl`             //出发地
    LogDest string `json:LogDest`                           //目的地
    LogToSeller string `json:LogToSeller`                   //销售商
    LogStorageTm string `json:LogStorageTm`                 //存储时间
    LogMOT string `json:LogMOT`                             //运送方式
    LogCopName string `json:LogCopName`                     //物流公司名称
    LogCost string `json:LogCost`                           //费用
}

func (a *CollegeChainCode) Init(stub shim.ChaincodeStubInterface) pb.Response {
    return shim.Success(nil)
}

func (a *CollegeChainCode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
    fn,args := stub.GetFunctionAndParameters()
    if fn == "addPeerInfo"{
        return a.addPeerInfo(stub,args)
    } else if fn == "addProInfo"{
        return a.addProInfo(stub,args)
    } else if fn == "getMember"{
        return a.getMember(stub,args)
    }else if fn == "addLogInfo"{
        return a.addLogInfo(stub,args)
    }else if fn == "getPeerInfo"{
        return a.getPeerInfo(stub,args)
    }else if fn == "getLogInfo"{
        return a.getLogInfo(stub,args)
    }else if fn == "getProInfo"{
        return a.getProInfo(stub,args)
    }else if fn == "getLogInfo_l"{
        return a.getLogInfo_l(stub,args)
    }

    return shim.Error("Recevied unkown function invocation")
}

func (a *CollegeChainCode) addPeerInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    var err error 
    var Members Member

    if len(args)!=10{
        return shim.Error("Incorrect number of arguments.")
    }
    Members.MemberID = args[0]
    if Members.MemberID == ""{
        return shim.Error("MemberID can not be empty.")
    }
    
    
    Members.MemberInfo.MemberPetName = args[1]
    Members.MemberInfo.sex = args[2]
  //  Members.MemberInfo.FoodMFGDate = args[3]
  //  Members.MemberInfo.FoodEXPDate = args[4]
    Members.MemberInfo.MemberProfile = args[5]
    Members.MemberInfo.MemberIDcard = args[6]
    Members.MemberInfo.MemberName = args[7]
    Members.MemberInfo.MemberDevo = args[8]
    Members.MemberInfo.MemberEmail = args[9]
    PeerInfosJSONasBytes,err := json.Marshal(Members)
    if err != nil{
        return shim.Error(err.Error())
    }

    err = stub.PutState(Members.MemberID,PeerInfosJSONasBytes)
    if err != nil{
        return shim.Error(err.Error())
    }

    return shim.Success(nil)
}

func(a *CollegeChainCode) addProInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
        
    var Members Member
    var ProInfoitem ProInfo

    if  (len(args)-1)%2 != 0 || len(args) == 1{
        return shim.Error("Incorrect number of arguments")
    }

    MemberID := args[0]
    for i :=1;i < len(args);{   
        ProInfoitem.ProID = args[i]
        ProInfoitem.ProName = args[i+1]
        Members.Memberproduct = append(Members.Memberproduct,ProInfoitem)
        i = i+2
    }
    
    
    Members.MemberID = MemberID
  /*  Members.Memberproduct = Memberproduct*/
    ProInfoJsonAsBytes,err := json.Marshal(Members)
    if err != nil {
    return shim.Error(err.Error())
    }

    err = stub.PutState(Members.MemberID,ProInfoJsonAsBytes)
    if err != nil{
        return shim.Error(err.Error())
    }
    return shim.Success(nil)
        
}

func(a *CollegeChainCode) addLogInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
 
    var err error
    var Members Member

    if len(args)!=11{
        return shim.Error("Incorrect number of arguments.")
    }
    Members.MemberID = args[0]
    if Members.MemberID == ""{
        return shim.Error("MemberID can not be empty.")
    }
    Members.Wallet.LogDepartureTm = args[1]
    Members.Wallet.LogArrivalTm = args[2]
    Members.Wallet.LogMission = args[3]
    Members.Wallet.LogDeparturePl = args[4]
    Members.Wallet.LogDest = args[5]
    Members.Wallet.LogToSeller = args[6]
    Members.Wallet.LogStorageTm = args[7]
    Members.Wallet.LogMOT = args[8]
    Members.Wallet.LogCopName = args[9]
    Members.Wallet.LogCost = args[10]
    
    LogInfosJSONasBytes,err := json.Marshal(Members)
    if err != nil{
        return shim.Error(err.Error())
    } 
    err = stub.PutState(Members.MemberID,LogInfosJSONasBytes)
    if err != nil{
        return shim.Error(err.Error())
    }
    return shim.Success(nil)
}



func(a *CollegeChainCode) getMember (stub shim.ChaincodeStubInterface,args []string) pb.Response{
    if len(args) != 1{
        return shim.Error("Incorrect number of arguments.")
    }
    MemberID := args[0]
    resultsIterator,err := stub.GetHistoryForKey(MemberID)
    if err != nil {
        return shim.Error(err.Error())
    }
    defer resultsIterator.Close()
    
    var MemberAllInfo MemberAllInfo

    for resultsIterator.HasNext(){
        var Members Member
        response,err :=resultsIterator.Next()
        if err != nil {
             return shim.Error(err.Error())
        }
        json.Unmarshal(response.Value,&Members)
        if Members.MemberInfo.MemberPetName !=""{
            MemberAllInfo.MemberInfo = Members.MemberInfo
        }else if Members.Memberproduct != nil{
            MemberAllInfo.Memberproduct = Members.Memberproduct
        }else if Members.Wallet.LogMission !=""{
            MemberAllInfo.Wallet = append(MemberAllInfo.Wallet,Members.Wallet)
        }

    }
    
    jsonsAsBytes,err := json.Marshal(MemberAllInfo)
    if err != nil{
        return shim.Error(err.Error())
    }

    return shim.Success(jsonsAsBytes)
}
 

func(a *CollegeChainCode) getPeerInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
    
    if len(args) != 1{
        return shim.Error("Incorrect number of arguments.")
    }
    MemberID := args[0]
    resultsIterator,err := stub.GetHistoryForKey(MemberID)
    if err != nil {
        return shim.Error(err.Error())
    }
    defer resultsIterator.Close()
    
    var MemberInfo PeerInfo

    for resultsIterator.HasNext(){
        var Members Member
        response,err :=resultsIterator.Next()
        if err != nil {
            return shim.Error(err.Error())
        }
        json.Unmarshal(response.Value,&Members)
        if Members.MemberInfo.MemberPetName != ""{
            MemberInfo = Members.MemberInfo
            continue
        }
    }
    jsonsAsBytes,err := json.Marshal(MemberInfo)   
    if err != nil {
        return shim.Error(err.Error())
    }
    return shim.Success(jsonsAsBytes)
}

func(a *CollegeChainCode) getProInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
 
    if len(args) !=1{
        return shim.Error("Incorrect number of arguments.")
    }
    MemberID := args[0]
    resultsIterator,err := stub.GetHistoryForKey(MemberID)

    if err != nil{
        return shim.Error(err.Error())
    }
    defer resultsIterator.Close()
    
    var Memberproduct []ProInfo
    for resultsIterator.HasNext(){
        var Members Member
        response,err := resultsIterator.Next()
        if err != nil{
            return shim.Error(err.Error())
        }
        json.Unmarshal(response.Value,&Members)
        if Members.Memberproduct != nil{
            Memberproduct = Members.Memberproduct
            continue
        }
    }
    jsonsAsBytes,err := json.Marshal(Memberproduct)
    if err != nil{
        return shim.Error(err.Error())
    }
    return shim.Success(jsonsAsBytes)
}

func(a *CollegeChainCode) getLogInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{

    var LogInfos []WalletInfo

    if len(args) != 1{
        return shim.Error("Incorrect number of arguments.")
    }

    MemberID := args[0]
    resultsIterator,err :=stub.GetHistoryForKey(MemberID)
    if err != nil{
        return shim.Error(err.Error())
    }
    defer resultsIterator.Close()

   
    for resultsIterator.HasNext(){
        var Members Member
        response,err := resultsIterator.Next()
        if err != nil {
            return shim.Error(err.Error())
        }
        json.Unmarshal(response.Value,&Members)
        if Members.Wallet.LogMission != ""{
            LogInfos = append(LogInfos,Members.Wallet)
        }
    }
    jsonsAsBytes,err := json.Marshal(LogInfos)
    if err != nil{
        return shim.Error(err.Error())
    }
    return shim.Success(jsonsAsBytes)
}

func(a *CollegeChainCode) getLogInfo_l(stub shim.ChaincodeStubInterface,args []string) pb.Response{
    var WalletInfo WalletInfo

    if len(args) != 1{
        return shim.Error("Incorrect number of arguments.")
    }

    MemberID := args[0]
    resultsIterator,err :=stub.GetHistoryForKey(MemberID)
    if err != nil{
        return shim.Error(err.Error())
    }
    defer resultsIterator.Close()

   
    for resultsIterator.HasNext(){
        var Members Member
        response,err := resultsIterator.Next()
        if err != nil {
            return shim.Error(err.Error())
        }
        json.Unmarshal(response.Value,&Members)
        if Members.Wallet.LogMission != ""{
           WalletInfo = Members.Wallet
           continue 
       }
    }
    jsonsAsBytes,err := json.Marshal(WalletInfo)
    if err != nil{
        return shim.Error(err.Error ())
    }
    return shim.Success(jsonsAsBytes)
}


func main(){
     err := shim.Start(new(CollegeChainCode))
     if err != nil {
         fmt.Printf("Error starting cool chaincode: %s ",err)
     }
}
