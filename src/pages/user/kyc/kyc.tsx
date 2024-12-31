import React from 'react';

const UserKYC: React.FC = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center" style={{ color: 'var(--primary-color)' }}>
          Financial Status
        </h2>
        <form className="mt-6 space-y-6">
          {/* Incomes Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Incomes (A)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="income-type" className="block text-sm font-medium">
                  Type
                </label>
                <select
                  id="income-type"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="salary">Salary</option>
                  <option value="investment">Investment</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="income-amount" className="block text-sm font-medium">
                  Amount (Currency)
                </label>
                <input
                  type="number"
                  id="income-amount"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
            <button type="button" className="btn-primary px-4 py-2 mt-4 rounded-md">
              Add Income
            </button>
          </div>

          {/* Assets Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Assets (B)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="asset-type" className="block text-sm font-medium">
                  Type
                </label>
                <select
                  id="asset-type"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="bond">Bond</option>
                  <option value="liquidity">Liquidity</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="asset-amount" className="block text-sm font-medium">
                  Amount (Currency)
                </label>
                <input
                  type="number"
                  id="asset-amount"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
            <button type="button" className="btn-primary px-4 py-2 mt-4 rounded-md">
              Add Asset
            </button>
          </div>

          {/* Liabilities Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Liabilities (C)
            </h3>
            <p className="text-sm mb-4 text-gray-600">
              Liabilities are any outstanding debts or obligations you may have. These can include loans such as
              personal loans, mortgages, or other forms of debt.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="liability-type" className="block text-sm font-medium">
                  Type
                </label>
                <select
                  id="liability-type"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="personal-loan">Personal Loan</option>
                  <option value="real-estate-loan">Real Estate Loan</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="liability-amount" className="block text-sm font-medium">
                  Amount (Currency)
                </label>
                <input
                  type="number"
                  id="liability-amount"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="liabilities-total" className="block text-sm font-medium">
                Total Liabilities
              </label>
              <input
                type="number"
                id="liabilities-total"
                className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Calculated Total"
                readOnly
              />
            </div>
            <button type="button" className="btn-primary px-4 py-2 mt-4 rounded-md">
              Add Liability
            </button>
          </div>

          {/* Source of Wealth Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Source of Wealth (D)
            </h3>
            <p className="text-sm mb-4 text-gray-600">
              This section identifies the origin of your wealth, such as any inheritance or donations you may have
              received. It's important for financial transparency.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="wealth-type" className="block text-sm font-medium">
                  Type
                </label>
                <select
                  id="wealth-type"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="inheritance">Inheritance</option>
                  <option value="donation">Donation</option>
                </select>
              </div>
              <div>
                <label htmlFor="wealth-amount" className="block text-sm font-medium">
                  Amount (Currency)
                </label>
                <input
                  type="number"
                  id="wealth-amount"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="wealth-total" className="block text-sm font-medium">
                Total Source of Wealth
              </label>
              <input
                type="number"
                id="wealth-total"
                className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Calculated Total"
                readOnly
              />
            </div>
            <button type="button" className="btn-primary px-4 py-2 mt-4 rounded-md">
              Add Source of Wealth
            </button>
          </div>

          {/* Net Worth Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Net Worth
            </h3>
            <div>
              <label htmlFor="net-worth-total" className="block text-sm font-medium">
                Total
              </label>
              <input
                type="number"
                id="net-worth-total"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Automatically calculated"
                disabled
              />
            </div>
          </div>

          {/* Investment Experience and Objectives Section */}
          <div className="panel">
            <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>
              Investment Experience and Objectives
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="investment-experience" className="block text-sm font-medium">
                  Experience in Financial Markets
                </label>
                <select
                  id="investment-experience"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="<5-years">&lt; 5 years</option>
                  <option value="5-10-years">&gt; 5 and &lt; 10 years</option>
                  <option value=">10-years">&gt; 10 years</option>
                </select>
              </div>
              <div>
                <label htmlFor="risk-tolerance" className="block text-sm font-medium">
                  Risk Tolerance
                </label>
                <select
                  id="risk-tolerance"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                >
                  <option value="10%">10%</option>
                  <option value="30%">30%</option>
                  <option value="all-in">All-in</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserKYC;
