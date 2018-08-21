%% -------- BEGIN CONSTANTS DEFINITION --------
string: sizeVarName = "researchers";
string: selectedPlan = "subscriber";
string: rootOperation = "getDocumentsByAuthor";
float: researchers = 1512;
float: pageSize = 200;
float: numPublications = 37;
float: numPublicationsTypeJournal = 24;
float: numPublicationsTypeConference = 13;
%% -------- END CONSTANTS DEFINITION --------


%% -------- BEGIN SERVICES DEFINITION --------

%% -------- BEGIN getDocumentsByAuthor DEFINITION --------
	%name: sabius-publication-data
	%operationId: getDocumentsByAuthor
	%path: /v1/{snapshot}/authors/{authorId}/documents
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY ScopusSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: ScopusSearch
	%path: /search/scopus
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_ScopusSearch = ceil(numPublications/pageSize);
	%BEGIN LIMITS FOR: ScopusSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = count_getDocumentsByAuthor_ScopusSearch/quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		%No rates for plan non-subscriber and path /search/scopus and method GET
		%Plan: subscriber
		float: quota_subscriber_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value = count_getDocumentsByAuthor_ScopusSearch/quota_subscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		%No rates for plan subscriber and path /search/scopus and method GET
	%END LIMITS FOR: ScopusSearch

%% -------- BEGIN DEPENDENCY AbstractRetrieval4 OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: AbstractRetrieval4
	%path: /abstract/scopus_id/{scopus_id}
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_AbstractRetrieval4 = numPublications;
	%BEGIN LIMITS FOR: AbstractRetrieval4
		%Plan: non-subscriber
		float: quota_nonsubscriber_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = count_getDocumentsByAuthor_AbstractRetrieval4/quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		%No rates for plan non-subscriber and path /abstract/scopus_id/{scopus_id} and method GET
		%Plan: subscriber
		float: quota_subscriber_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = count_getDocumentsByAuthor_AbstractRetrieval4/quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		%No rates for plan subscriber and path /abstract/scopus_id/{scopus_id} and method GET
	%END LIMITS FOR: AbstractRetrieval4

%% -------- BEGIN DEPENDENCY SerialTitleMetadata OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleMetadata
	%path: /serial/title/issn/{issn}
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_SerialTitleMetadata = numPublicationsTypeJournal;
	%BEGIN LIMITS FOR: SerialTitleMetadata
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = count_getDocumentsByAuthor_SerialTitleMetadata/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		%No rates for plan non-subscriber and path /serial/title/issn/{issn} and method GET
		%Plan: subscriber
		float: quota_subscriber_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = count_getDocumentsByAuthor_SerialTitleMetadata/quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		%No rates for plan subscriber and path /serial/title/issn/{issn} and method GET
	%END LIMITS FOR: SerialTitleMetadata

%% -------- BEGIN DEPENDENCY SerialTitleSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleSearch
	%path: /serial/title
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_SerialTitleSearch = numPublicationsTypeConference;
	%BEGIN LIMITS FOR: SerialTitleSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = count_getDocumentsByAuthor_SerialTitleSearch/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		%No rates for plan non-subscriber and path /serial/title and method GET
		%Plan: subscriber
		float: quota_subscriber_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = count_getDocumentsByAuthor_SerialTitleSearch/quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		%No rates for plan subscriber and path /serial/title and method GET
	%END LIMITS FOR: SerialTitleSearch

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getDocumentsByAuthor DEFINITION --------

%% -------- END SERVICES DEFINITION --------

%% -------- BEGIN OUTER COMPOSITION DEFINITION --------
%% -------- END OUTER COMPOSITION DEFINITION --------




%% -------- BEGIN QUESTIONS DEFINITION --------
	%% -------- BEGIN MODULE 5: "full csp" --------

var int: researchers_subscriber_maximize;
constraint  researchers_subscriber_maximize >= 0;

constraint researchers_subscriber_maximize * count_getDocumentsByAuthor_ScopusSearch <= quota_subscriber_ScopusSearch_value;
output ["researchers_subscriber_maximize * count_getDocumentsByAuthor_ScopusSearch = ",show(researchers_subscriber_maximize * count_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getDocumentsByAuthor_ScopusSearch = ",show(count_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["quota_subscriber_ScopusSearch_value = ",show(quota_subscriber_ScopusSearch_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getDocumentsByAuthor_AbstractRetrieval4 <= quota_subscriber_AbstractRetrieval4_value;
output ["researchers_subscriber_maximize * count_getDocumentsByAuthor_AbstractRetrieval4 = ",show(researchers_subscriber_maximize * count_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getDocumentsByAuthor_AbstractRetrieval4 = ",show(count_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["quota_subscriber_AbstractRetrieval4_value = ",show(quota_subscriber_AbstractRetrieval4_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleMetadata <= quota_subscriber_SerialTitleMetadata_value;
output ["researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleMetadata = ",show(researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getDocumentsByAuthor_SerialTitleMetadata = ",show(count_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["quota_subscriber_SerialTitleMetadata_value = ",show(quota_subscriber_SerialTitleMetadata_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleSearch <= quota_subscriber_SerialTitleSearch_value;
output ["researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleSearch = ",show(researchers_subscriber_maximize * count_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getDocumentsByAuthor_SerialTitleSearch = ",show(count_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["quota_subscriber_SerialTitleSearch_value = ",show(quota_subscriber_SerialTitleSearch_value)];
output ["\n"];
output ["\n"];


	%Choose ONE solve statement
solve maximize researchers_subscriber_maximize;

output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];

	%% -------- END MODULE 4: "full csp " --------
%% -------- END QUESTIONS DEFINITION --------
