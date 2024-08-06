import React, { useState } from 'react';


const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number | string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<number | string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const handleTipChange = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const reset = () => {
    setBill('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople(1);
  };

  const billAmount = typeof bill === 'number' ? bill : parseFloat(bill) || 0;
  const customTipAmount = typeof customTip === 'number' ? customTip : parseFloat(customTip) || 0;
  const finalTipPercentage = customTip ? customTipAmount : tipPercentage;
  const tipAmount = (billAmount * finalTipPercentage) / 100;
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">SPILITTER</h1>
        
        <div className="mb-6">
          <label className="block text-gray-600 font-medium">Bill Amount</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full p-3 mt-2 border rounded focus:outline-none focus:border-teal-500"
            placeholder="$"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium">Select Tip %</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[5, 10, 15, 25, 50].map((percentage) => (
              <button
                key={percentage}
                onClick={() => handleTipChange(percentage)}
                className={`p-3 rounded text-white transition ${
                  tipPercentage === percentage && customTip === ''
                    ? 'bg-[#3bdd25]'
                    : 'bg-[#6fb466] hover:bg-[#40d12d]'
                }`}
              >
                {percentage}%
              </button>
            ))}
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              className="p-3 rounded bg-gray-200 text-gray-700 focus:outline-none focus:bg-white"
              placeholder="Custom"
              > </input>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium">Number of People</label>
          <input
            type="number"
            value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
            className="w-full p-3 mt-2 border rounded focus:outline-none focus:border-teal-500"

            min="1"
          />
        </div>

        <div className="bg-[#7b9267] p-4 rounded text-white mb-6">
          <div className="flex justify-between">
            <span>Tip Amount</span>
            <span>${tipPerPerson.toFixed(2)} / user</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Total</span>
            <span>${totalPerPerson.toFixed(2)} / user</span>
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full bg-[#54b947] p-3 rounded text-white font-semibold transition hover:bg-[#62d853]"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;
