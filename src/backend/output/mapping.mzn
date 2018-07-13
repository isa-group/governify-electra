%% -------- BEGIN CONSTANTS DEFINITION --------
string: size = "max_value";
string: selectedPlan = "Usage limitations";
string: param1 = "1";
string: param2 = "1";
string: param3 = "1";
%% -------- END CONSTANTS DEFINITION --------


%% -------- BEGIN SERVICES DEFINITION --------

%% -------- BEGIN s1m1 DEFINITION --------
	%name: s1
	%operationId: s1m1
	%path: /api/s1/method1
	%method: GET

%Mapping
float: mapping_START_s1m1 = 30;
%% -------- BEGIN DEPENDENCY s2m1 OF s1m1 DEFINITION --------
	%name: s2
	%operationId: s2m1
	%path: /api/s2/method1
	%method: GET

%Mapping
float: mapping_s1m1_s2m1 = 1;
	%BEGIN LIMITS FOR: s2m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s2m1_value = 100;
		float: quota_Usagelimitations_s1m1_s2m1_value = 100;
		float: quota_Usagelimitations_s1m1_s2m1_period_val = 1;
		string: quota_Usagelimitations_s1m1_s2m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_value = mapping_s1m1_s2m1/quota_Usagelimitations_s1m1_s2m1_value;
			float: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m1_s2m1_period_period = "weekly";

		float: rate_Usagelimitations_s1m1_s2m1_value = 1;
		float: rate_Usagelimitations_s1m1_s2m1_period_val = 1;
		string: rate_Usagelimitations_s1m1_s2m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m1_s2m1_value = mapping_s1m1_s2m1/rate_Usagelimitations_s1m1_s2m1_value;
			float: unitRateConsumption_Usagelimitations_s1m1_s2m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m1_s2m1_period_period = "secondly";
	%END LIMITS FOR: s2m1

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
float: prob_s1m1_s2m1 = 1;

array[int] of float: compositionReq_s1m1 = [prob_s1m1_s2m1 * mapping_s1m1_s2m1];

float: compositionReq_s1m1_calculated = sum(compositionReq_s1m1);

array[int] of float: compositionQuota_Usagelimitations_s1m1_value = [prob_s1m1_s2m1 * unitQuotaConsumption_Usagelimitations_s1m1_s2m1_value];

array[int] of float: compositionRate_Usagelimitations_s1m1_value = [prob_s1m1_s2m1 * unitRateConsumption_Usagelimitations_s1m1_s2m1_value];

float: compositionQuota_Usagelimitations_s1m1_value_calculated = max(compositionQuota_Usagelimitations_s1m1_value);

float: compositionRate_Usagelimitations_s1m1_value_calculated = max(compositionRate_Usagelimitations_s1m1_value);

%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s1m1 DEFINITION --------

%% -------- BEGIN s1m2 DEFINITION --------
	%name: s1
	%operationId: s1m2
	%path: /api/s1/method2
	%method: GET

%Mapping
float: mapping_START_s1m2 = 5;
%% -------- BEGIN DEPENDENCY s3m1 OF s1m2 DEFINITION --------
	%name: s3
	%operationId: s3m1
	%path: /api/s3/method1
	%method: GET

%Mapping
float: mapping_s1m2_s3m1 = 1;
	%BEGIN LIMITS FOR: s3m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s3m1_value = 100;
		float: quota_Usagelimitations_s1m2_s3m1_value = 100;
		float: quota_Usagelimitations_s1m2_s3m1_period_val = 1;
		string: quota_Usagelimitations_s1m2_s3m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m2_s3m1_value = mapping_s1m2_s3m1/quota_Usagelimitations_s1m2_s3m1_value;
			float: unitQuotaConsumption_Usagelimitations_s1m2_s3m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m2_s3m1_period_period = "weekly";

		float: rate_Usagelimitations_s1m2_s3m1_value = 1;
		float: rate_Usagelimitations_s1m2_s3m1_period_val = 1;
		string: rate_Usagelimitations_s1m2_s3m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m2_s3m1_value = mapping_s1m2_s3m1/rate_Usagelimitations_s1m2_s3m1_value;
			float: unitRateConsumption_Usagelimitations_s1m2_s3m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m2_s3m1_period_period = "secondly";
	%END LIMITS FOR: s3m1

%% -------- BEGIN DEPENDENCY s3m2 OF s1m2 DEFINITION --------
	%name: s3
	%operationId: s3m2
	%path: /api/s3/method2
	%method: GET

%Mapping
float: mapping_s1m2_s3m2 = 1;
	%BEGIN LIMITS FOR: s3m2
		%Plan: Usage limitations
		float: quota_Usagelimitations_s3m2_value = 100;
		float: quota_Usagelimitations_s1m2_s3m2_value = 100;
		float: quota_Usagelimitations_s1m2_s3m2_period_val = 1;
		string: quota_Usagelimitations_s1m2_s3m2_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m2_s3m2_value = mapping_s1m2_s3m2/quota_Usagelimitations_s1m2_s3m2_value;
			float: unitQuotaConsumption_Usagelimitations_s1m2_s3m2_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m2_s3m2_period_period = "weekly";

		float: rate_Usagelimitations_s1m2_s3m2_value = 1;
		float: rate_Usagelimitations_s1m2_s3m2_period_val = 1;
		string: rate_Usagelimitations_s1m2_s3m2_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m2_s3m2_value = mapping_s1m2_s3m2/rate_Usagelimitations_s1m2_s3m2_value;
			float: unitRateConsumption_Usagelimitations_s1m2_s3m2_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m2_s3m2_period_period = "secondly";
	%END LIMITS FOR: s3m2

%% -------- BEGIN DEPENDENCY s2m1 OF s1m2 DEFINITION --------
	%name: s2
	%operationId: s2m1
	%path: /api/s2/method1
	%method: GET

%Mapping
float: mapping_s1m2_s2m1 = 1;
	%BEGIN LIMITS FOR: s2m1
		%Plan: Usage limitations
		float: quota_Usagelimitations_s1m2_s2m1_value = 100;
		float: quota_Usagelimitations_s1m2_s2m1_period_val = 1;
		string: quota_Usagelimitations_s1m2_s2m1_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_value = mapping_s1m2_s2m1/quota_Usagelimitations_s1m2_s2m1_value;
			float: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_period_val = 1;
			string: unitQuotaConsumption_Usagelimitations_s1m2_s2m1_period_period = "weekly";

		float: rate_Usagelimitations_s1m2_s2m1_value = 1;
		float: rate_Usagelimitations_s1m2_s2m1_period_val = 1;
		string: rate_Usagelimitations_s1m2_s2m1_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_Usagelimitations_s1m2_s2m1_value = mapping_s1m2_s2m1/rate_Usagelimitations_s1m2_s2m1_value;
			float: unitRateConsumption_Usagelimitations_s1m2_s2m1_period_val = 1;
			string: unitRateConsumption_Usagelimitations_s1m2_s2m1_period_period = "secondly";
	%END LIMITS FOR: s2m1

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
float: prob_s1m2_s3m1 = 1;
float: prob_s1m2_s3m2 = 1;
float: prob_s1m2_s2m1 = 1;

array[int] of float: compositionReq_s1m2 = [prob_s1m2_s3m1 * mapping_s1m2_s3m1 , prob_s1m2_s3m2 * mapping_s1m2_s3m2 , prob_s1m2_s2m1 * mapping_s1m2_s2m1];

float: compositionReq_s1m2_calculated = sum(compositionReq_s1m2);

array[int] of float: compositionQuota_Usagelimitations_s1m2_value = [prob_s1m2_s3m1 * unitQuotaConsumption_Usagelimitations_s1m2_s3m1_value , prob_s1m2_s3m2 * unitQuotaConsumption_Usagelimitations_s1m2_s3m2_value , prob_s1m2_s2m1 * unitQuotaConsumption_Usagelimitations_s1m2_s2m1_value];

array[int] of float: compositionRate_Usagelimitations_s1m2_value = [prob_s1m2_s3m1 * unitRateConsumption_Usagelimitations_s1m2_s3m1_value , prob_s1m2_s3m2 * unitRateConsumption_Usagelimitations_s1m2_s3m2_value , prob_s1m2_s2m1 * unitRateConsumption_Usagelimitations_s1m2_s2m1_value];

float: compositionQuota_Usagelimitations_s1m2_value_calculated = max(compositionQuota_Usagelimitations_s1m2_value);

float: compositionRate_Usagelimitations_s1m2_value_calculated = max(compositionRate_Usagelimitations_s1m2_value);

%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END s1m2 DEFINITION --------

%% -------- END SERVICES DEFINITION --------

%% -------- BEGIN OUTER COMPOSITION DEFINITION --------
float: prob_s1m1 = 1;
float: prob_s1m2 = 1;

array[int] of float: compositionReq = [prob_s1m1 * compositionReq_s1m1_calculated , prob_s1m2 * compositionReq_s1m2_calculated];

float: compositionReq_calculated = sum(compositionReq);

array[int] of float: compositionQuota_Usagelimitations = [prob_s1m1 * compositionQuota_Usagelimitations_s1m1_value_calculated , prob_s1m2 * compositionQuota_Usagelimitations_s1m2_value_calculated];

array[int] of float: compositionRate_Usagelimitations = [prob_s1m1 * compositionRate_Usagelimitations_s1m1_value_calculated , prob_s1m2 * compositionRate_Usagelimitations_s1m2_value_calculated];

float: compositionQuota_Usagelimitations_calculated = max(compositionQuota_Usagelimitations);

float: compositionRate_Usagelimitations_calculated = max(compositionRate_Usagelimitations);

%% -------- END OUTER COMPOSITION DEFINITION --------




%% -------- BEGIN QUESTIONS DEFINITION --------
	%% -------- BEGIN MODULE 5: "full csp" --------

var int: max_value_Usagelimitations_maximize;
constraint  max_value_Usagelimitations_maximize >= 0;

constraint  max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1  <= quota_Usagelimitations_s2m1_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m1 = ",show(mapping_START_s1m1)];
output ["\n"];
output ["mapping_s1m1_s2m1 = ",show(mapping_s1m1_s2m1)];
output ["\n"];
output ["quota_Usagelimitations_s2m1_value = ",show(quota_Usagelimitations_s2m1_value)];
output ["\n"];
output ["\n"];


constraint  max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1  <= quota_Usagelimitations_s2m1_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m2 = ",show(mapping_START_s1m2)];
output ["\n"];
output ["mapping_s1m2_s2m1 = ",show(mapping_s1m2_s2m1)];
output ["\n"];
output ["quota_Usagelimitations_s2m1_value = ",show(quota_Usagelimitations_s2m1_value)];
output ["\n"];
output ["\n"];


constraint  max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m1  <= quota_Usagelimitations_s3m1_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m1 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m1)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m2 = ",show(mapping_START_s1m2)];
output ["\n"];
output ["mapping_s1m2_s3m1 = ",show(mapping_s1m2_s3m1)];
output ["\n"];
output ["quota_Usagelimitations_s3m1_value = ",show(quota_Usagelimitations_s3m1_value)];
output ["\n"];
output ["\n"];


constraint  max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m2  <= quota_Usagelimitations_s3m2_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m2 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s3m2)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m2 = ",show(mapping_START_s1m2)];
output ["\n"];
output ["mapping_s1m2_s3m2 = ",show(mapping_s1m2_s3m2)];
output ["\n"];
output ["quota_Usagelimitations_s3m2_value = ",show(quota_Usagelimitations_s3m2_value)];
output ["\n"];
output ["\n"];


constraint  max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1  <= quota_Usagelimitations_s2m1_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m1 * mapping_s1m1_s2m1)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m1 = ",show(mapping_START_s1m1)];
output ["\n"];
output ["mapping_s1m1_s2m1 = ",show(mapping_s1m1_s2m1)];
output ["\n"];
output ["quota_Usagelimitations_s2m1_value = ",show(quota_Usagelimitations_s2m1_value)];
output ["\n"];
output ["\n"];


constraint  max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1  <= quota_Usagelimitations_s2m1_value;
output ["max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1 = ",show(max_value_Usagelimitations_maximize * mapping_START_s1m2 * mapping_s1m2_s2m1)];
output ["\n"];
output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];
output ["mapping_START_s1m2 = ",show(mapping_START_s1m2)];
output ["\n"];
output ["mapping_s1m2_s2m1 = ",show(mapping_s1m2_s2m1)];
output ["\n"];
output ["quota_Usagelimitations_s2m1_value = ",show(quota_Usagelimitations_s2m1_value)];
output ["\n"];
output ["\n"];


	%Choose ONE solve statement
solve maximize max_value_Usagelimitations_maximize;

output ["max_value_Usagelimitations_maximize = ",show(max_value_Usagelimitations_maximize)];
output ["\n"];

	%% -------- END MODULE 4: "full csp" --------
%% -------- END QUESTIONS DEFINITION --------
