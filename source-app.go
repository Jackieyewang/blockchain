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
    Wallet int `json:Wallet`                  //WALLET
}

type MemberAllInfo struct{
    MemberID string `json:MemberID`
    MemberInfo PeerInfo `json:MemberInfo`
    Memberproduct []ProInfo `json:Memberproduct`
    Wallet int `json:Wallet`
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
        return a.getMember(stub,args)}else if fn == "getLogInfo_l"{
            //     return a.getLogInfo_l(stub,args)
    // }else if fn == "addLogInfo"{
    //     return a.addLogInfo(stub,args)}else if fn == "getLogInfo_l"{
    //     return a.getLogInfo_l(stub,args)
    }else if fn == "getPeerInfo"{
        return a.getPeerInfo(stub,args)
    // }else if fn == "getLogInfo"{
    //     return a.getLogInfo(stub,args)
    }else if fn == "getProInfo"{
        return a.getProInfo(stub,args)
    // }else if fn == "getLogInfo_l"{
    //     return a.getLogInfo_l(stub,args)
    }

    return shim.Error("Recevied unkown function invocation")
}

func (a *CollegeChainCode) addPeerInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    var err error 
    var Members Member

    if len(args)!=8{
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
    Members.MemberInfo.MemberProfile = args[3]
    Members.MemberInfo.MemberIDcard = args[4]
    Members.MemberInfo.MemberName = args[5]
    Members.MemberInfo.MemberDevo = args[6]
    Members.MemberInfo.MemberEmail = args[7]
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
        //修改内容会覆盖原来的，需要修改
    var Members Member
    var ProInfoitem ProInfo

    if  (len(args)-1)%2 != 0 || len(args) == 1{
        return shim.Error("Incorrect number of arguments")
    }

    MemberID := args[0]                 //需要返回的第二个值是成员的ID，第一个是函数名
 
    ProInfoitem.ProID = args[1]
    ProInfoitem.ProName = args[2]
    Members.Memberproduct = append(Members.Memberproduct,ProInfoitem)

    
    
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

// func(a *CollegeChainCode) addLogInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
 
//     var err error
//     var Members Member

//     if len(args)!=11{
//         return shim.Error("Incorrect number of arguments.")
//     }
//     Members.MemberID = args[0]
//     if Members.MemberID == ""{
//         return shim.Error("MemberID can not be empty.")
//     }
//     LogInfosJSONasBytes,err := json.Marshal(Members)   
//     if err != nil{
//         return shim.Error(err.Error())
//     } 
//     err = stub.PutState(Members.MemberID,LogInfosJSONasBytes)
//     if err != nil{
//         return shim.Error(err.Error())
//     }
//     return shim.Success(nil)
// }



func(a *CollegeChainCode) getMember (stub shim.ChaincodeStubInterface,args []string) pb.Response{
    if len(args) != 1{             //没发现调用？？？？？？？？？？？？？？？？
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
        }/*else if Members.Wallet.LogMission !=""{
            MemberAllInfo.Wallet = append(MemberAllInfo.Wallet,Members.Wallet)*/
        }

    }
    
    jsonsAsBytes,err := json.Marshal(MemberAllInfo)
    if err != nil{
        return shim.Error(err.Error())
    }

    return shim.Success(jsonsAsBytes)
}
 

func(a *CollegeChainCode) getPeerInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{
    /*？*/
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

// func(a *CollegeChainCode) getLogInfo (stub shim.ChaincodeStubInterface,args []string) pb.Response{

//     var LogInfos []WalletInfo

//     if len(args) != 1{
//         return shim.Error("Incorrect number of arguments.")
//     }

//     MemberID := args[0]
//     resultsIterator,err :=stub.GetHistoryForKey(MemberID)
//     if err != nil{
//         return shim.Error(err.Error())
//     }
//     defer resultsIterator.Close()

   
//     for resultsIterator.HasNext(){
//         var Members Member
//         response,err := resultsIterator.Next()
//         if err != nil {
//             return shim.Error(err.Error())
//         }
//         json.Unmarshal(response.Value,&Members)
//         if Members.Wallet.LogMission != ""{
//             LogInfos = append(LogInfos,Members.Wallet)
//         }
//     }
//     jsonsAsBytes,err := json.Marshal(LogInfos)
//     if err != nil{
//         return shim.Error(err.Error())
//     }
//     return shim.Success(jsonsAsBytes)
// }

// func(a *CollegeChainCode) getLogInfo_l(stub shim.ChaincodeStubInterface,args []string) pb.Response{
//     var WalletInfo WalletInfo

//     if len(args) != 1{
//         return shim.Error("Incorrect number of arguments.")
//     }

//     MemberID := args[0]
//     resultsIterator,err :=stub.GetHistoryForKey(MemberID)
//     if err != nil{
//         return shim.Error(err.Error())
//     }
//     defer resultsIterator.Close()

   
//     for resultsIterator.HasNext(){
//         var Members Member
//         response,err := resultsIterator.Next()
//         if err != nil {
//             return shim.Error(err.Error())
//         }
//         json.Unmarshal(response.Value,&Members)
//         if Members.Wallet.LogMission != ""{
//            WalletInfo = Members.Wallet
//            continue 
//        }
//     }
//     jsonsAsBytes,err := json.Marshal(WalletInfo)
//     if err != nil{
//         return shim.Error(err.Error ())
//     }
//     return shim.Success(jsonsAsBytes)
// }


func main(){
     err := shim.Start(new(CollegeChainCode))
     if err != nil {
         fmt.Printf("Error starting cool chaincode: %s ",err)
     }
}
