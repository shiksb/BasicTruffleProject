var helloWorld = artifacts.require("./helloWorld.sol");

var balances, i = 0;

contract('helloWorld', function(accounts) {
  var inst;

  it('should check if initial balance is 1000', function() {
    return helloWorld.deployed()
      .then(function(instance) {
        inst = instance;
        return instance.owner.call();
      }).then(function(own) {
          return inst.getBalance.call(own);
        }).then(function(bal) {
            console.log(bal, accounts[0]); //owner
            i ++;
            assert.equal(bal, 1000, "1000 wasn't in the first account");
            return inst.getBalance.call(accounts[i]);
          }).then(function(bal) {
              console.log(bal, accounts[i]); //acc1
              i ++;
              return inst.getBalance.call(accounts[i]);
            }).then(function(bal) {
              console.log(bal, accounts[i]); //acc2
            });
  });

  it('should transfer 100 to account 2', function() {
    return helloWorld.deployed()
      .then(function(instance) {
        inst = instance;
        return instance.transfer(accounts[1], 100, {from: accounts[0]});
      }).then(function(success) {
          // assert.equal(success, true, "transaction successful");
          return inst.getBalance.call(accounts[0]);
        }).then(function(bal) {
            console.log(bal, accounts[0])
            assert.equal(bal.toNumber(), 900, "amount sent from account 1");
            return inst.getBalance.call(accounts[1]);
          }).then(function(bal) {
              console.log(bal, accounts[1]); //owner
              assert.equal(bal.toNumber(), 100, "amount received at account 2");
            });
  });

});
