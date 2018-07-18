%% -------- BEGIN CONSTANTS DEFINITION --------
string: rootOperation = "b1m1";
string: sizeVarName = "inputSize";
string: selectedPlan = "Usage limitations";
%% -------- END CONSTANTS DEFINITION --------


%% -------- BEGIN SERVICES DEFINITION --------

%% -------- BEGIN b1m1 DEFINITION --------
	%name: b1
	%operationId: b1m1
	%path: /api/b1/m1
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY s1m1 OF b1m1 DEFINITION --------
	%name: s1
	%operationId: s1m1
	%path: /api/s1/m1
	%method: GET

%Mapping
float: count_b1m1_s1m1 = 10;
	%BEGIN LIMITS FOR: s1m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s1m1_value = 100;
		float: quota_Usagelimitations_b1m1_s1m1_value = 100;
		float: quota_Usagelimitations_b1m1_s1m1_period_val = 1;
		string: quota_Usagelimitations_b1m1_s1m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_b1m1_s1m1_value = count_b1m1_s1m1/quota_Usagelimitations_b1m1_s1m1_value;
			float: unitQuotaConsumption_Usagelimitations_b1m1_s1m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_b1m1_s1m1_period_period = "weekly";

		float: rate_Usagelimitations_b1m1_s1m1_value = 1;
		float: rate_Usagelimitations_b1m1_s1m1_period_val = 1;
		string: rate_Usagelimitations_b1m1_s1m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_b1m1_s1m1_value = count_b1m1_s1m1/rate_Usagelimitations_b1m1_s1m1_value;
			float: unitRateConsumption_Usagelimitations_b1m1_s1m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_b1m1_s1m1_period_period = "secondly";
	%END LIMITS FOR: s1m1

%% -------- BEGIN DEPENDENCY s1m2 OF b1m1 DEFINITION --------
	%name: s1
	%operationId: s1m2
	%path: /api/s1/m2
	%method: GET

%Mapping
float: count_b1m1_s1m2 = 1;
	%BEGIN LIMITS FOR: s1m2
		%Plan: Usage limitations
		float: quota_Usagelimitations_s1m2_value = 100;
		float: quota_Usagelimitations_b1m1_s1m2_value = 100;
		float: quota_Usagelimitations_b1m1_s1m2_period_val = 1;
		string: quota_Usagelimitations_b1m1_s1m2_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_b1m1_s1m2_value = count_b1m1_s1m2/quota_Usagelimitations_b1m1_s1m2_value;
			float: unitQuotaConsumption_Usagelimitations_b1m1_s1m2_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_b1m1_s1m2_period_period = "weekly";

		float: rate_Usagelimitations_b1m1_s1m2_value = 1;
		float: rate_Usagelimitations_b1m1_s1m2_period_val = 1;
		string: rate_Usagelimitations_b1m1_s1m2_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_b1m1_s1m2_value = count_b1m1_s1m2/rate_Usagelimitations_b1m1_s1m2_value;
			float: unitRateConsumption_Usagelimitations_b1m1_s1m2_period_val = 1;
			string: unitRateConsumption_Usagelimitations_b1m1_s1m2_period_period = "secondly";
	%END LIMITS FOR: s1m2

%% -------- BEGIN DEPENDENCY s2m4 OF b1m1 DEFINITION --------
	%name: s2
	%operationId: s2m4
	%path: /api/s2/m4
	%method: GET

%Mapping
float: count_b1m1_s2m4 = 4;
	%BEGIN LIMITS FOR: s2m4
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m4_value = 100;
		float: quota_Usagelimitations_b1m1_s2m4_value = 100;
		float: quota_Usagelimitations_b1m1_s2m4_period_val = 1;
		string: quota_Usagelimitations_b1m1_s2m4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_b1m1_s2m4_value = count_b1m1_s2m4/quota_Usagelimitations_b1m1_s2m4_value;
			float: unitQuotaConsumption_Usagelimitations_b1m1_s2m4_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_b1m1_s2m4_period_period = "weekly";

		float: rate_Usagelimitations_b1m1_s2m4_value = 1;
		float: rate_Usagelimitations_b1m1_s2m4_period_val = 1;
		string: rate_Usagelimitations_b1m1_s2m4_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_b1m1_s2m4_value = count_b1m1_s2m4/rate_Usagelimitations_b1m1_s2m4_value;
			float: unitRateConsumption_Usagelimitations_b1m1_s2m4_period_val = 1;
			string: unitRateConsumption_Usagelimitations_b1m1_s2m4_period_period = "secondly";
	%END LIMITS FOR: s2m4

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END b1m1 DEFINITION --------

%% -------- BEGIN s1m1 DEFINITION --------
	%name: s1
	%operationId: s1m1
	%path: /api/s1/m1
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY s2m1 OF s1m1 DEFINITION --------
	%name: s2
	%operationId: s2m1
	%path: /api/s2/m1
	%method: GET

%Mapping
float: count_s1m1_s2m1 = 1;
	%BEGIN LIMITS FOR: s2m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m1_value = 100;
		float: quota_Usagelimitations_s1m1_s2m1_value = 100;
		float: quota_Usagelimitations_s1m1_s2m1_period_val = 1;
		string: quota_Usagelimitations_s1m1_s2m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_value = count_s1m1_s2m1/quota_Usagelimitations_s1m1_s2m1_value;
			float: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_period_period = "weekly";

		float: rate_Usagelimitations_s1m1_s2m1_value = 1;
		float: rate_Usagelimitations_s1m1_s2m1_period_val = 1;
		string: rate_Usagelimitations_s1m1_s2m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m1_s2m1_value = count_s1m1_s2m1/rate_Usagelimitations_s1m1_s2m1_value;
			float: unitRateConsumption_Usagelimitations_s1m1_s2m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m1_s2m1_period_period = "secondly";
	%END LIMITS FOR: s2m1

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s1m1 DEFINITION --------

%% -------- BEGIN s1m2 DEFINITION --------
	%name: s1
	%operationId: s1m2
	%path: /api/s1/m2
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY s2m1 OF s1m2 DEFINITION --------
	%name: s2
	%operationId: s2m1
	%path: /api/s2/m1
	%method: GET

%Mapping
float: count_s1m2_s2m1 = 1;
	%BEGIN LIMITS FOR: s2m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s1m2_s2m1_value = 100;
		float: quota_Usagelimitations_s1m2_s2m1_period_val = 1;
		string: quota_Usagelimitations_s1m2_s2m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_value = count_s1m2_s2m1/quota_Usagelimitations_s1m2_s2m1_value;
			float: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_period_period = "weekly";

		float: rate_Usagelimitations_s1m2_s2m1_value = 1;
		float: rate_Usagelimitations_s1m2_s2m1_period_val = 1;
		string: rate_Usagelimitations_s1m2_s2m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m2_s2m1_value = count_s1m2_s2m1/rate_Usagelimitations_s1m2_s2m1_value;
			float: unitRateConsumption_Usagelimitations_s1m2_s2m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m2_s2m1_period_period = "secondly";
	%END LIMITS FOR: s2m1

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s1m2 DEFINITION --------

%% -------- BEGIN s2m1 DEFINITION --------
	%name: s2
	%operationId: s2m1
	%path: /api/s2/m1
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY s2m2 OF s2m1 DEFINITION --------
	%name: s2
	%operationId: s2m2
	%path: /api/s2/m2
	%method: GET

%Mapping
float: count_s2m1_s2m2 = 1;
	%BEGIN LIMITS FOR: s2m2
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m2_value = 100;
		float: quota_Usagelimitations_s2m1_s2m2_value = 100;
		float: quota_Usagelimitations_s2m1_s2m2_period_val = 1;
		string: quota_Usagelimitations_s2m1_s2m2_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s2m1_s2m2_value = count_s2m1_s2m2/quota_Usagelimitations_s2m1_s2m2_value;
			float: unitQuotaConsumption_Usagelimitations_s2m1_s2m2_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s2m1_s2m2_period_period = "weekly";

		float: rate_Usagelimitations_s2m1_s2m2_value = 1;
		float: rate_Usagelimitations_s2m1_s2m2_period_val = 1;
		string: rate_Usagelimitations_s2m1_s2m2_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s2m1_s2m2_value = count_s2m1_s2m2/rate_Usagelimitations_s2m1_s2m2_value;
			float: unitRateConsumption_Usagelimitations_s2m1_s2m2_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s2m1_s2m2_period_period = "secondly";
	%END LIMITS FOR: s2m2

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s2m1 DEFINITION --------

%% -------- BEGIN s2m2 DEFINITION --------
	%name: s2
	%operationId: s2m2
	%path: /api/s2/m2
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY s2m3 OF s2m2 DEFINITION --------
	%name: s2
	%operationId: s2m3
	%path: /api/s2/m3
	%method: GET

%Mapping
float: count_s2m2_s2m3 = 1;
	%BEGIN LIMITS FOR: s2m3
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m3_value = 100;
		float: quota_Usagelimitations_s2m2_s2m3_value = 100;
		float: quota_Usagelimitations_s2m2_s2m3_period_val = 1;
		string: quota_Usagelimitations_s2m2_s2m3_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s2m2_s2m3_value = count_s2m2_s2m3/quota_Usagelimitations_s2m2_s2m3_value;
			float: unitQuotaConsumption_Usagelimitations_s2m2_s2m3_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s2m2_s2m3_period_period = "weekly";

		float: rate_Usagelimitations_s2m2_s2m3_value = 1;
		float: rate_Usagelimitations_s2m2_s2m3_period_val = 1;
		string: rate_Usagelimitations_s2m2_s2m3_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s2m2_s2m3_value = count_s2m2_s2m3/rate_Usagelimitations_s2m2_s2m3_value;
			float: unitRateConsumption_Usagelimitations_s2m2_s2m3_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s2m2_s2m3_period_period = "secondly";
	%END LIMITS FOR: s2m3

%% -------- BEGIN DEPENDENCY s2m4 OF s2m2 DEFINITION --------
	%name: s2
	%operationId: s2m4
	%path: /api/s2/m4
	%method: GET

%Mapping
float: count_s2m2_s2m4 = 1;
	%BEGIN LIMITS FOR: s2m4
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m2_s2m4_value = 100;
		float: quota_Usagelimitations_s2m2_s2m4_period_val = 1;
		string: quota_Usagelimitations_s2m2_s2m4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s2m2_s2m4_value = count_s2m2_s2m4/quota_Usagelimitations_s2m2_s2m4_value;
			float: unitQuotaConsumption_Usagelimitations_s2m2_s2m4_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s2m2_s2m4_period_period = "weekly";

		float: rate_Usagelimitations_s2m2_s2m4_value = 1;
		float: rate_Usagelimitations_s2m2_s2m4_period_val = 1;
		string: rate_Usagelimitations_s2m2_s2m4_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s2m2_s2m4_value = count_s2m2_s2m4/rate_Usagelimitations_s2m2_s2m4_value;
			float: unitRateConsumption_Usagelimitations_s2m2_s2m4_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s2m2_s2m4_period_period = "secondly";
	%END LIMITS FOR: s2m4

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s2m2 DEFINITION --------

%% -------- END SERVICES DEFINITION --------

%% -------- BEGIN OUTER COMPOSITION DEFINITION --------
%% -------- END OUTER COMPOSITION DEFINITION --------




%% -------- BEGIN QUESTIONS DEFINITION --------
	%% -------- BEGIN MODULE 5: "full csp" --------

var int: inputSize_Usagelimitations_maximize;
constraint  inputSize_Usagelimitations_maximize >= 0;

constraint inputSize_Usagelimitations_maximize * count_b1m1_s1m1 <= quota_Usagelimitations_s1m1_value;
output ["inputSize_Usagelimitations_maximize * count_b1m1_s1m1 = ",show(inputSize_Usagelimitations_maximize * count_b1m1_s1m1)];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m1 = ",show(count_b1m1_s1m1)];
output ["\n"];
output ["quota_Usagelimitations_s1m1_value = ",show(quota_Usagelimitations_s1m1_value)];
output ["\n"];
output ["\n"];


constraint inputSize_Usagelimitations_maximize * count_b1m1_s1m2 <= quota_Usagelimitations_s1m2_value;
output ["inputSize_Usagelimitations_maximize * count_b1m1_s1m2 = ",show(inputSize_Usagelimitations_maximize * count_b1m1_s1m2)];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m2 = ",show(count_b1m1_s1m2)];
output ["\n"];
output ["quota_Usagelimitations_s1m2_value = ",show(quota_Usagelimitations_s1m2_value)];
output ["\n"];
output ["\n"];


constraint inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s2m4  ) ) <= quota_Usagelimitations_s2m4_value;
output ["inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s2m4  ) ) = ",show(inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m4  ) + (  count_b1m1_s2m4  ) ))];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m1 = ",show(count_b1m1_s1m1)];
output ["\n"];
output ["count_s1m1_s2m1 = ",show(count_s1m1_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2 = ",show(count_s2m1_s2m2)];
output ["\n"];
output ["count_s2m2_s2m4   +   count_b1m1_s1m2 = ",show(count_s2m2_s2m4   +   count_b1m1_s1m2)];
output ["\n"];
output ["count_s1m2_s2m1 = ",show(count_s1m2_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2 = ",show(count_s2m1_s2m2)];
output ["\n"];
output ["count_s2m2_s2m4   +   count_b1m1_s2m4 = ",show(count_s2m2_s2m4   +   count_b1m1_s2m4)];
output ["\n"];
output ["quota_Usagelimitations_s2m4_value = ",show(quota_Usagelimitations_s2m4_value)];
output ["\n"];
output ["\n"];


constraint inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1  ) ) <= quota_Usagelimitations_s2m1_value;
output ["inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1  ) ) = ",show(inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1  ) ))];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m1 = ",show(count_b1m1_s1m1)];
output ["\n"];
output ["count_s1m1_s2m1   +   count_b1m1_s1m2 = ",show(count_s1m1_s2m1   +   count_b1m1_s1m2)];
output ["\n"];
output ["count_s1m2_s2m1 = ",show(count_s1m2_s2m1)];
output ["\n"];
output ["quota_Usagelimitations_s2m1_value = ",show(quota_Usagelimitations_s2m1_value)];
output ["\n"];
output ["\n"];


constraint inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2  ) ) <= quota_Usagelimitations_s2m2_value;
output ["inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2  ) ) = ",show(inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2  ) ))];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m1 = ",show(count_b1m1_s1m1)];
output ["\n"];
output ["count_s1m1_s2m1 = ",show(count_s1m1_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2   +   count_b1m1_s1m2 = ",show(count_s2m1_s2m2   +   count_b1m1_s1m2)];
output ["\n"];
output ["count_s1m2_s2m1 = ",show(count_s1m2_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2 = ",show(count_s2m1_s2m2)];
output ["\n"];
output ["quota_Usagelimitations_s2m2_value = ",show(quota_Usagelimitations_s2m2_value)];
output ["\n"];
output ["\n"];


constraint inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) ) <= quota_Usagelimitations_s2m3_value;
output ["inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) ) = ",show(inputSize_Usagelimitations_maximize * ( (  count_b1m1_s1m1 * count_s1m1_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) + (  count_b1m1_s1m2 * count_s1m2_s2m1 * count_s2m1_s2m2 * count_s2m2_s2m3  ) ))];
output ["\n"];
output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];
output ["count_b1m1_s1m1 = ",show(count_b1m1_s1m1)];
output ["\n"];
output ["count_s1m1_s2m1 = ",show(count_s1m1_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2 = ",show(count_s2m1_s2m2)];
output ["\n"];
output ["count_s2m2_s2m3   +   count_b1m1_s1m2 = ",show(count_s2m2_s2m3   +   count_b1m1_s1m2)];
output ["\n"];
output ["count_s1m2_s2m1 = ",show(count_s1m2_s2m1)];
output ["\n"];
output ["count_s2m1_s2m2 = ",show(count_s2m1_s2m2)];
output ["\n"];
output ["count_s2m2_s2m3 = ",show(count_s2m2_s2m3)];
output ["\n"];
output ["quota_Usagelimitations_s2m3_value = ",show(quota_Usagelimitations_s2m3_value)];
output ["\n"];
output ["\n"];


	%Choose ONE solve statement
solve maximize inputSize_Usagelimitations_maximize;

output ["inputSize_Usagelimitations_maximize = ",show(inputSize_Usagelimitations_maximize)];
output ["\n"];

	%% -------- END MODULE 4: "full csp " --------
%% -------- END QUESTIONS DEFINITION --------
