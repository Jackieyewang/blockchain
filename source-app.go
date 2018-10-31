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
    MemberID string `json:MemberID`                           //帐号ID
    //密码
    MemberInfo PeerInfo `json:MemberInfo`                     //帐号信息
    MemberProduct []ProInfo `json:MemberProduct`              //个人产权
    MemberPermission []string `json:MemberPermission`         //个人权限
    MemberWallet int `json:MemberWallet`                      //WALLET
}

type MemberAllInfo struct{
    MemberID string `json:MemberID`
    MemberInfo PeerInfo `json:MemberInfo`
    Memberproduct []ProInfo `json:Memberproduct`
    MemberWallet int `json:MemberWallet`
}

//个人信息
type PeerInfo struct{
    MemberPetName string `json:MemberPetName`                 //昵称
    MemberSex string `json:MemberSex`                         //性别
    // FoodMFGDate string `json:FoodMFGDate`                  //出生日期
    // FoodEXPDate string `json:FoodEXPDate`                  
    MemberProfile string `json:MemberProfile`                 //个人简介
    /* 身份证和真名待定，如果要设必须只能自己可见*/                         
    MemberIDcard string `json:MemberIDcard`                   //身份证
    MemberName string `json:MemberName`                       //真名
    /*  */
    MemberDevo string `json:MemberDevo`                       //贡献度
    MemberEmail string `json:MemberEmail`                     //邮箱
}
type ProInfo struct{
    ProID string `json:ProID`                                 //产权ID
    ProName string `json:ProName`                             //产权名称
    ProSpeech string `json:ProSpeech`                         //产权内容
    ProOwnerID string `json:ProOwnerID`                       //产权拥有者
    ProPrice int `json:ProPrice`                              //产权价格
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
    } else if fn == "getPeerInfo"{
        return a.getPeerInfo(stub,args)
    } else if fn == "getProInfo"{
        return a.getProInfo(stub,args)
    } else if fn == "transaction"{
        return a.transaction(stub,args)
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

func(a *CollegeChainCode) transaction(stub shim.ChaincodeStubInterface,args []string) pb.Response{
    var Buyer, Owner string                            //买家与卖家的ID
    var Pro string                                     //产品的ID
    var Bwallet, Owallet int                           //买家钱包余额与卖家钱包余额
    var Price int                                      //产品价格
    var err error

    if len(args) != 2 {
        return shim.Error("Incorrect number of arguments. Expecting function followed by 2 names")
    }

    Buyer = args[0]
    Pro = args[1]
    //获得卖主ID与产品价格
    Probyte, err := stub.GetState(Pro)
    if err != nil {
        return shim.Error("Failed to get state")
    }
    if Probyte == nil {
        return shim.Error("Entity not found")
    }
    var ProSelled ProInfo
    err = json.Unmarshal(Probyte, &ProSelled)           //反序列化
    if err != nil {
        return shim.Error("Failed to decode JSON")
    }
    Owner = ProSelled.ProOwnerID
    Price = ProSelled.ProPrice
    //获得买主余额
    Buyerbytes, err := stub.GetState(Buyer)
    if err != nil {
        return shim.Error("Failed to get state")
    }
    if Buyerbytes == nil {
        return shim.Error("Entity not found")
    }
    var BuyerInfo MemberInfo
    err = json.Unmarshal(Buyerbytes, &BuyerInfo)
    if err != nil {
        return shim.Error("Failed to decode JSON")
    }
    Bwallet = BuyerInfo.MemberWallet
    //获取卖主余额
    Ownerbytes, err := stub.GetState(Owner)
    if err != nil {
        return shim.Error("Failed to get state")
    }
    if Ownerbytes == nil {
        return shim.Error("Entity not found")
    }
    var OwnerInfo MemberInfo
    err = json.Unmarshal(Ownerbytes, &OwnerInfo)
    if err != nil {
        return shim.Error("Failed to decode JSON")
    }
    Owallet = OwnerInfo.MemberWallet

    if Bwallet < Price {
        return shim.Error("Do not have enough money")
    }
    //余额转移计算
    Bwallet = Bwallet - Price
    Owallet = Owallet + Price
    BuyerInfo.MemberPermission = append(BuyerInfo.MemberPermission, Pro)
    BuyerInfo.MemberWallet = Bwallet
    OwnerInfo.MemberWallet = Owallet

    // 将改变后的值写入状态数据库中
    BuyerInfoJSONasBytes, err := json.Marshal(BuyerInfo)
    if err != nil{
        return shim.Error(err.Error())
    }
    err = stub.PutState(BuyerInfo.MemberID, BuyerInfoJSONasBytes)
    if err != nil {
        return shim.Error(err.Error())
    }

    OwnerInfoJSONasBytes, err := json.Marshal(OwnerInfo)
    if err != nil{
        return shim.Error(err.Error())
    }
    err = stub.PutState(OwnerInfo.MemberID, OwnerInfoJSONasBytes)
    if err != nil {
        return shim.Error(err.Error())
    }

    return shim.Success(nil)
}

func main(){
     err := shim.Start(new(CollegeChainCode))
     if err != nil {
         fmt.Printf("Error starting cool chaincode: %s ",err)
     }
}
