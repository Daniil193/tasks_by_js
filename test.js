describe("pow", function() {

    it("2 в степени 3 будет 8", function() {
      assert.equal(pow(2, 3), 8);
    });
  
    it("3 в степени 3 будет 27", function() {
      assert.equal(pow(3, 3), 27);
    });

    it("2 в степени 10 будет 1024", function() {
        assert.equal(pow(2, 10), 1024);
      });
  });


  describe("flatArr", function() {

    it("[1,2, [3,4, [5,6, [7,8, [9,10]]]]] --> [1,2,3,4,5,6,7,8,9,10]", function() {

      const flatArrInput1 = [1,2, [3,4, [5,6, [7,8, [9,10]]]]];
      const res1 = [1,2,3,4,5,6,7,8,9,10];

      assert.deepEqual(flatArr(flatArrInput1), res1);
    });
  
    it("[[[[[1,2,3]]]]] --> [1,2,3]", function() {

      const flatArrInput2 = [[[[[1,2,3]]]]];
      const res2 = [1,2,3];

      assert.deepEqual(flatArr(flatArrInput2), res2);
    });

    it("[[[[[1,2,3]]], 4]] --> [1,2,3,4]", function() {

      const flatArrInput3 = [[[[[1,2,3]]], 4]];
      const res3 = [1,2,3,4];

        assert.deepEqual(flatArr(flatArrInput3), res3);
      });

    it("[[[[[1,2,true]]], '']] --> [1,2,true,'']", function() {

      const flatArrInput3 = [[[[[1,2,true]]], ""]];
      const res3 = [1,2,true,""];

        assert.deepEqual(flatArr(flatArrInput3), res3);
      });
  });


  describe("numToWords", function() {

    it("четыреста шестнадцать", function() {
      assert.equal(numToWords(416), "четыреста шестнадцать");
    });
  
    it("одна тысяча двадцать пять", function() {
      assert.equal(numToWords(1025), "одна тысяча двадцать пять");
    });

    it("сто двенадцать тысяч четыреста семьдесят девять", function() {
        assert.equal(numToWords(112479), "сто двенадцать тысяч четыреста семьдесят девять");
      });

    it("сто тысяч пятнадцать", function() {
        assert.equal(numToWords(100015), "сто тысяч пятнадцать");
      });
  });


  describe("numSeq", function() {

    it("test 1", function() {
      const numSeqInput1 = [-6, -3, -2, -1, 0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]
      assert.equal(numSeq(numSeqInput1), "-6,-3-5,7-11,14,15,17-20");
    });
  
    it("test 2", function() {
      const numSeqInput2 = [-3, -2, -1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20]
      assert.equal(numSeq(numSeqInput2), "-3--1,1-5,7-11,14-20");
    });
  });


  describe("maskMatrix", function() {

    it("test 1", function() {
      const matrix = [[1, 2, 3, 2, 3, 7, 9],
                      [4, 5, 6, 5, 7, 8, 9],
                      [7, 8, 9, 4, 6, 3, 1]]
      const matrix_3_3 = [[1, 2, 3],
                          [4, 5, 6],
                          [7, 8, 9]]
      const res1 = [false,true,true,true,true];
      assert.deepEqual(maskMatrix(matrix, matrix_3_3), res1);
    });
  
    it("test2", function() {
      const matrix = [[1, 2, 3, 2, 3, 7, 9, 1, 2, 3],
                      [4, 5, 6, 5, 7, 8, 9, 4, 5, 6],
                      [7, 8, 9, 4, 6, 3, 1, 7, 8, 9]]
      const matrix_3_3 = [[1, 2, 3],
                          [4, 5, 6],
                          [7, 8, 9]]
      const res2 = [false,true,true,true,true,true,true,false];                    
      assert.deepEqual(maskMatrix(matrix, matrix_3_3), res2);
    });
  });
